import type CSSJSONObject from '../../CSSJSONObject';
import { HTMLDOMElement } from '../../../Core/Renderer/DOMElementType.js';
import Menu from './Menu.js';
declare class MenuItem {
    static defaultOptions: Partial<Options>;
    constructor(menu: Menu, options: Options);
    menu: Menu;
    options: Options;
    container: HTMLDOMElement;
    innerElement?: HTMLDOMElement;
    isActive: boolean;
    private setContainer;
    setInnerElement(): HTMLDOMElement | undefined;
    update(): void;
    activate(): void;
    deactivate(): void;
}
export type ToolbarItemId = 'destroy' | 'settings' | 'drag' | 'viewFullscreen';
export interface ItemOptions {
    id: ToolbarItemId;
    name?: string;
    type: 'icon' | 'toggle' | 'text' | 'button';
    className?: string;
    text?: string;
    langKey?: string;
    style?: CSSJSONObject;
    events?: {
        update?: Function;
    };
}
export interface ButtonOptions extends ItemOptions {
    type: 'button';
    text?: string;
    events?: {
        update?: Function;
        click?: Function;
    };
}
export interface IconOptions extends ItemOptions {
    type: 'icon';
    icon: string;
    events: {
        update?: Function;
        onmousedown?: Function;
        click?: Function;
    };
}
export interface ToggleOptions extends ItemOptions {
    type: 'toggle';
    getValue?: (item: MenuItem) => boolean;
    setValue: (item: MenuItem, value: boolean) => void;
    events: {
        update?: Function;
        click: Function;
    };
}
export interface TextOptions extends ItemOptions {
    type: 'text';
}
export type Type = 'icon' | 'toggle' | 'text' | 'button';
export type Options = ButtonOptions | IconOptions | ToggleOptions | TextOptions;
export default MenuItem;
