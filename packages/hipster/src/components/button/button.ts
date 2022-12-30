import { componentSizeMap } from "../constants"

export const buttonTypes = [
    'primary',
    'secondary',
    'tertiary',
    'plain button',
    'destructive'
] as const

export const buttonProps = {
    type: {
        type: String,
        values: buttonTypes,
        required: false,
        default: 'primary'
    },
    text: {
        type: String,
        required: true
    },
    size: {
        type: componentSizeMap,
        required: false
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false
    },
    iconLeft: {
        type: String,
        required: false,
        default: ''
    }
};

export const buttonEmits = {
    click: (evt: MouseEvent) => evt instanceof MouseEvent
}