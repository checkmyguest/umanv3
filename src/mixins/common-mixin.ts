import { default as BLENDER_CATEGORIES, default as HOURS } from "../../constants";

export default {
    data() {
        return {
            BLENDER_CATEGORIES: BLENDER_CATEGORIES,
            HOURS: HOURS,
        }
    },
    methods: {
        capitalizeFirstLetter(string: string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        getFilteredPickHours(hour_limit: string, comparision: any) {
            let pickHours = HOURS
            if(hour_limit) {
              const id = Number.parseInt(hour_limit.split(':')[0])
              pickHours = pickHours.filter((p: { id: number; }) => comparision ? p.id >= id + 1 : p.id <= id + 1)
            }
            return pickHours
        },
        getFilterOptionsFromArray(array: any[]) {
            return array.map(value => {
                return {
                    [value]: value
                }
            })
        },
        getListWithParents(list: any[], attribute_key: string | number, attribute_value: string | number, type = 'all') {
            const childs = list.map(element => {
                return { [element[attribute_key]]: element[attribute_value] }
            })
    
            let parents = []
            for (const element of list) {
                if (element[attribute_key]) {
                    const sliceValue = 1
                    let key = element[attribute_key].split('-').slice(0, sliceValue).join('-')
                    key = `Tous les ${key}`
                    const oldParent = parents.find(b => Object.keys(b)[0] === key)
                    const parentIndex = parents.indexOf(oldParent)
                    if (parentIndex === -1) {
                        parents.push({
                            [key]: element[attribute_value]
                        })
                    }
                    else {
                        parents[parentIndex][key] = `${oldParent[key]},${element[attribute_value]}`
                    }
                }
            }

            switch (type) {
                case 'all': { return parents.concat(childs)
                }
                case 'parents': { return parents
                }
                case 'childs': { return childs
                }
            }
        },
        copyToClipboard(text: string) {
            const textArea = document.createElement('textarea')
            textArea.value = text
            document.body.append(textArea)
            textArea.select()
            try {
                document.execCommand('copy')
                textArea.remove()
                this.$store.dispatch('commun/displayNotification', {alert: 'success', msg: 'Copié !'})
            } catch (error) {
                console.log('copyToClipboard error:', error)
                textArea.remove()
            }
        },
        previewType(data: string) {
            if(data.includes('data:image')) return 'preview'
            if(data.includes('video/mp4')) return 'video'
            if(data.includes('application/pdf')) return 'pdf'
        },
        docType(name: string) {
            if(!name) return
            if (name.slice(0, 4) === 'data') return this.previewType(name)
            const extension = name.split('.')[1].toLowerCase()
            if (['jpeg', 'jpg', 'png', 'heic'].includes(extension)) return 'img'
            if (['mp4', 'avi', 'mov', 'flv', 'wmv'].includes(extension)) return 'video'
            if (['pdf'].includes(extension)) return 'pdf'
        },
    }
}