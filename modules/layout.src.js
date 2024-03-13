/**
 * @license Highcharts Dashboards Layout 2.0.0 (2024-03-13)
 *
 * (c) 2009-2024 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('dashboards/modules/layout', ['dashboards'], function (Dashboards) {
            factory(Dashboards);
            factory.Dashboards = Dashboards;
            return factory;
        });
    } else {
        factory(typeof Dashboards !== 'undefined' ? Dashboards : undefined);
    }
}(function (Dashboards) {
    'use strict';
    var _modules = Dashboards ? Dashboards._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                window.dispatchEvent(new CustomEvent(
                    'DashboardsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Dashboards/EditMode/EditRenderer.js', [_modules['Dashboards/EditMode/EditGlobals.js'], _modules['Core/Utilities.js']], function (EditGlobals, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { merge, createElement, defined } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Function to create a context button.
         * @internal
         *
         * @param parentElement
         * The element to which the new element should be appended.
         *
         * @param editMode
         * EditMode instance.
         *
         * @returns
         * Context button element.
         */
        function renderContextButton(parentNode, editMode) {
            const contextMenuOptions = editMode.options.contextMenu;
            let contextButton;
            if (contextMenuOptions) {
                contextButton = createElement('button', {
                    className: EditGlobals.classNames.contextMenuBtn,
                    onclick: function (event) {
                        event.stopPropagation();
                        editMode.onContextBtnClick();
                    }
                }, {}, parentNode);
                // Add the icon if defined.
                if (contextMenuOptions.icon) {
                    createElement('img', {
                        src: contextMenuOptions.icon,
                        className: EditGlobals.classNames.icon
                    }, {}, contextButton);
                }
                // Add text next to the icon if defined.
                if (contextMenuOptions.text) {
                    createElement('span', {
                        className: EditGlobals.classNames.contextMenuBtnText,
                        textContent: contextMenuOptions.text
                    }, {}, contextButton);
                }
                contextButton.setAttribute('aria-label', editMode.lang.accessibility.contextMenu.button);
                contextButton.setAttribute('aria-expanded', 'false');
            }
            return contextButton;
        }
        /**
         * Creates the collapsable header element.
         * @internal
         *
         * @param parentElement
         * The HTMLElement to which the element should be rendered to.
         *
         * @param options
         * Nested header options.
         *
         * @returns the outer element and content in the collapsable div.
         */
        function renderCollapseHeader(parentElement, options) {
            const { name, showToggle, onchange, isEnabled, isNested, lang } = options;
            const accordion = createElement('div', {
                className: EditGlobals.classNames[isNested ? 'accordionNestedWrapper' : 'accordionContainer'] + ' ' + EditGlobals.classNames.collapsableContentHeader
            }, {}, parentElement);
            const header = createElement('div', {
                className: EditGlobals.classNames.accordionHeader
            }, {}, accordion);
            const headerBtn = createElement('button', { className: EditGlobals.classNames.accordionHeaderBtn }, {}, header);
            createElement('span', {
                textContent: lang[name] || name
            }, {}, headerBtn);
            if (showToggle) {
                renderToggle(header, {
                    enabledOnOffLabels: true,
                    id: name,
                    name: '',
                    onchange: onchange,
                    value: isEnabled || false,
                    lang
                });
            }
            const headerIcon = createElement('span', {
                className: EditGlobals.classNames.accordionHeaderIcon + ' ' +
                    EditGlobals.classNames.collapsedElement
            }, {}, headerBtn);
            const content = createElement('div', {
                className: EditGlobals.classNames.accordionContent + ' ' +
                    EditGlobals.classNames.hiddenElement
            }, {}, accordion);
            headerBtn.addEventListener('click', function () {
                content.classList.toggle(EditGlobals.classNames.hiddenElement);
                headerIcon.classList.toggle(EditGlobals.classNames.collapsedElement);
            });
            return { outerElement: accordion, content: content };
        }
        /**
         * Function to create select element.
         *
         * @param parentElement
         * The element to which the new element should be appended.
         *
         * @param options
         * Select form field options.
         *
         * @returns
         * Select element
         */
        function renderSelect(parentElement, options) {
            if (!parentElement) {
                return;
            }
            if (options.name) {
                renderText(parentElement, { title: options.name, isLabel: true });
            }
            const iconsURLPrefix = options.iconsURLPrefix || '';
            const customSelect = createElement('div', {
                className: EditGlobals.classNames.dropdown +
                    ' ' +
                    EditGlobals.classNames.collapsableContentHeader
            }, {}, parentElement);
            const btn = createElement('button', {
                className: EditGlobals.classNames.dropdownButton
            }, {}, customSelect);
            const btnContent = createElement('div', {
                className: EditGlobals.classNames.dropdownButtonContent
            }, {}, btn);
            const iconURL = (U.find(options.selectOptions, (item) => item.name === options.value) || {}).iconURL;
            let headerIcon;
            if (iconURL) {
                headerIcon = createElement('img', {
                    src: iconsURLPrefix + iconURL,
                    className: EditGlobals.classNames.icon
                }, {}, btnContent);
            }
            const placeholder = createElement('span', {
                textContent: options.value,
                id: options.id || ''
            }, {}, btnContent);
            const dropdownPointer = createElement('img', {
                className: EditGlobals.classNames.dropdownIcon +
                    ' ' +
                    EditGlobals.classNames.collapsedElement,
                src: iconsURLPrefix + 'dropdown-pointer.svg'
            }, {}, btn);
            const dropdown = createElement('ul', {
                className: EditGlobals.classNames.dropdownContent +
                    ' ' +
                    EditGlobals.classNames.hiddenElement
            }, {}, customSelect);
            btn.addEventListener('click', function () {
                dropdown.classList.toggle(EditGlobals.classNames.hiddenElement);
                dropdownPointer.classList.toggle(EditGlobals.classNames.collapsedElement);
            });
            for (let i = 0, iEnd = options.selectOptions.length; i < iEnd; ++i) {
                renderSelectElement(merge(options.selectOptions[i] || {}, { iconsURLPrefix }), dropdown, placeholder, options.id, dropdownPointer, headerIcon, options.onchange);
            }
            return customSelect;
        }
        /**
         * @internal
         */
        function renderSelectElement(option, dropdown, placeholder, id, dropdownPointer, headerIcon, callback) {
            const iconURL = option.iconsURLPrefix + option.iconURL;
            const selectOption = createElement('li', {}, {}, dropdown);
            const selectOptionBtn = createElement('button', { className: EditGlobals.classNames.customSelectButton }, {}, selectOption);
            if (option.iconURL) {
                createElement('img', {
                    src: iconURL
                }, {}, selectOptionBtn);
            }
            createElement('span', { textContent: option.name || '' }, {}, selectOptionBtn);
            selectOptionBtn.addEventListener('click', function () {
                dropdown.classList.add(EditGlobals.classNames.hiddenElement);
                dropdownPointer.classList.toggle(EditGlobals.classNames.collapsedElement);
                placeholder.textContent = option.name || '';
                if (headerIcon && option.iconURL) {
                    headerIcon.src = iconURL;
                }
                if (callback) {
                    return callback(option.name);
                }
            });
        }
        /**
         * Function to create toggle element.
         *
         * @param parentElement
         * The element to which the new element should be appended.
         *
         * @param options
         * Form field options.
         *
         * @returns
         * Toggle element.
         */
        function renderToggle(parentElement, options) {
            if (!parentElement) {
                return;
            }
            const lang = options.lang, value = options.value, title = options.title || options.name, langKey = options.langKey;
            const toggleContainer = createElement('button', {
                className: EditGlobals.classNames.toggleContainer,
                type: 'button',
                role: 'switch',
                ariaChecked: false,
                ariaLabel: langKey ? lang.accessibility[langKey][options.name] : ''
            }, {}, parentElement);
            if (title) {
                renderText(toggleContainer, { title });
            }
            if (options.enabledOnOffLabels) {
                renderText(toggleContainer, {
                    title: lang.off,
                    className: EditGlobals.classNames.toggleLabels
                });
            }
            const toggle = createElement('label', {
                className: EditGlobals.classNames.toggleWrapper +
                    ' ' + (options.className || '')
            }, {}, toggleContainer);
            const input = renderCheckbox(toggle, value), callbackFn = options.onchange;
            callbackFn && toggleContainer.addEventListener('click', (e) => {
                callbackFn(!input.checked);
                input.checked = !input.checked;
                toggleContainer.setAttribute('aria-checked', input.checked);
                e.stopPropagation();
            });
            const slider = createElement('span', {
                className: EditGlobals.classNames.toggleSlider
            }, {}, toggle);
            callbackFn && slider.addEventListener('click', (e) => {
                e.preventDefault();
            });
            if (options.enabledOnOffLabels) {
                renderText(toggleContainer, {
                    title: lang.on,
                    className: EditGlobals.classNames.toggleLabels
                });
            }
            return toggleContainer;
        }
        /**
         * Function to create text element.
         *
         * @param parentElement
         * The element to which the new element should be appended
         *
         * @param text
         * Text to be displayed
         *
         * @param callback
         * Callback function to be fired on the click
         *
         * @returns text Element
         */
        function renderText(parentElement, options) {
            let textElem;
            const { title: text, className, isLabel } = options;
            if (parentElement) {
                const labelFor = isLabel ? { htmlFor: text } : {};
                textElem = createElement(isLabel ? 'label' : 'div', {
                    className: EditGlobals.classNames.labelText + ' ' + (className || ''),
                    textContent: text,
                    ...labelFor
                }, {}, parentElement);
            }
            return textElem;
        }
        /**
         * Function to create Icon element.
         *
         * @param parentElement
         * The element to which the new element should be appended.
         *
         * @param icon
         * Icon URL
         *
         * @param callback
         * Callback function
         *
         * @returns
         * Icon Element
         */
        function renderIcon(parentElement, options) {
            const { icon, callback } = options;
            if (!parentElement) {
                return;
            }
            const iconElem = createElement('div', {
                onclick: callback,
                className: options.className || ''
            }, {}, parentElement);
            iconElem.style['background-image'] = 'url(' + icon + ')';
            const mousedown = options.mousedown;
            const click = options.click;
            if (mousedown) {
                iconElem.onmousedown = function () {
                    mousedown.apply(this, arguments);
                };
            }
            if (click) {
                iconElem.addEventListener('click', function () {
                    click.apply(this, arguments);
                });
            }
            return iconElem;
        }
        /**
         * Function to create input element.
         *
         * @param parentElement
         * the element to which the new element should be appended
         *
         * @param options
         * Form field options
         *
         * @returns
         * Input Element
         */
        function renderInput(parentElement, options) {
            if (!parentElement) {
                return;
            }
            if (options.name) {
                renderText(parentElement, { title: options.name, isLabel: true });
            }
            const input = createElement('input', {
                type: 'text',
                onclick: options.callback,
                id: options.id || '',
                name: options.name || '',
                value: ((defined(options.value) &&
                    options.value.toString().replace(/\"/g, '')) || '')
            }, {}, parentElement);
            const onchange = options.onchange;
            if (onchange) {
                input.addEventListener('change', function (e) {
                    onchange(e.target.value);
                });
            }
            return input;
        }
        /**
         * Function to create textarea element.
         *
         * @param parentElement
         * The element to which the new element should be appended
         *
         * @param options
         * Form field options
         *
         * @returns
         * textarea Element
         */
        function renderTextarea(parentElement, options) {
            if (!parentElement) {
                return;
            }
            if (options.name) {
                renderText(parentElement, { title: options.name, isLabel: true });
            }
            const textarea = createElement('textarea', {
                id: options.id,
                name: options.name,
                value: options.value || ''
            }, {}, parentElement);
            const onchange = options.onchange;
            if (onchange) {
                textarea.addEventListener('change', function (e) {
                    onchange(e.target.value);
                });
            }
            return textarea;
        }
        /**
         * Function to render the input of type checkbox.
         *
         * @param parentElement
         * An element to which render the checkbox to
         *
         * @param checked
         * Whether the checkbox should be checked or not.
         *
         * @returns
         * The checkbox element
         */
        function renderCheckbox(parentElement, checked) {
            let input;
            if (parentElement) {
                input = createElement('input', {
                    type: 'checkbox',
                    checked: !!checked
                }, {}, parentElement);
            }
            return input;
        }
        /**
         * Function to create button element.
         *
         * @param parentElement
         * the element to which the new element should be appended
         *
         * @param options
         * Button field options
         *
         * @returns
         * Button Element
         */
        function renderButton(parentElement, options) {
            let button;
            if (!parentElement) {
                return;
            }
            button = createElement('button', {
                className: (EditGlobals.classNames.button + ' ' +
                    (options.className || '')),
                onclick: options.callback,
                textContent: options.text
            }, options.style || {}, parentElement);
            if (options.icon) {
                button.style['background-image'] =
                    'url(' + options.icon + ')';
            }
            return button;
        }
        /**
         * Get the renderer function based on the type of the element to render.
         *
         * @param type
         * Type of the element to render
         *
         * @returns
         * function to render a specific element
         */
        function getRendererFunction(type) {
            return {
                select: renderSelect,
                toggle: renderToggle,
                text: renderText,
                collapse: renderCollapseHeader,
                icon: renderIcon,
                contextButton: renderContextButton,
                input: renderInput,
                textarea: renderTextarea,
                checkbox: renderCheckbox,
                button: renderButton
            }[type];
        }
        const EditRenderer = {
            renderSelect,
            renderToggle,
            renderText,
            renderCollapseHeader,
            renderIcon,
            renderContextButton,
            renderInput,
            renderTextarea,
            renderCheckbox,
            renderButton,
            getRendererFunction
        };

        return EditRenderer;
    });
    _registerModule(_modules, 'Dashboards/EditMode/Menu/MenuItem.js', [_modules['Dashboards/EditMode/EditGlobals.js'], _modules['Core/Utilities.js'], _modules['Dashboards/EditMode/EditRenderer.js']], function (EditGlobals, U, EditRenderer) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { createElement, merge } = U;
        class MenuItem {
            /* *
            *
            *  Constructor
            *
            * */
            constructor(menu, options) {
                this.menu = menu;
                this.isActive = false;
                this.options = merge(MenuItem.defaultOptions, options);
                this.container = this.setContainer();
                this.innerElement = this.setInnerElement();
            }
            /* *
            *
            *  Functions
            *
            * */
            setContainer() {
                const item = this, options = item.options;
                let className = EditGlobals.classNames.menuItem;
                if (item.menu.options.itemsClassName) {
                    className += ' ' + item.menu.options.itemsClassName;
                }
                if (options.className) {
                    className += ' ' + options.className;
                }
                return createElement('div', { className: className || '' }, merge(this.options.style || {}, 
                // To remove
                this.isActive ? { display: 'block' } : {}), this.menu.container);
            }
            setInnerElement() {
                const item = this, options = item.options, container = item.container, langKey = options.langKey;
                if (options.type === 'toggle') {
                    return EditRenderer.renderToggle(container, {
                        id: options.id,
                        name: options.id,
                        title: langKey ?
                            this.menu.editMode.lang[langKey] :
                            options.text,
                        value: !!(options.getValue && options.getValue(item)),
                        lang: this.menu.editMode.lang,
                        langKey: langKey,
                        onchange: options.events?.click?.bind(item)
                    });
                }
                if (options.type === 'text') {
                    return EditRenderer.renderText(container, {
                        title: langKey ?
                            this.menu.editMode.lang[langKey] :
                            options.text || '',
                        className: options.className || ''
                    });
                }
                if (options.type === 'icon') {
                    return EditRenderer.renderIcon(container, {
                        icon: options.icon || '',
                        mousedown: options.events?.onmousedown?.bind(item),
                        click: options.events?.click?.bind(item)
                    });
                }
                if (options.type === 'button') {
                    return EditRenderer.renderButton(container, {
                        callback: options.events?.click?.bind(item),
                        className: options.className || '',
                        style: options.style || {},
                        text: langKey ?
                            this.menu.editMode.lang[langKey] :
                            (options.text || '')
                    });
                }
            }
            update() {
                const item = this, options = item.options;
                if (options.events && options.events.update) {
                    options.events.update.apply(item, arguments);
                }
            }
            activate() {
                const item = this;
                item.update();
                // Temp.
                if (item.container) {
                    item.isActive = true;
                    item.container.style.display = 'block';
                }
            }
            deactivate() {
                const item = this;
                // Temp.
                if (item.container) {
                    item.isActive = false;
                    item.container.style.display = 'none';
                }
            }
        }
        /* *
        *
        *  Static Properties
        *
        * */
        MenuItem.defaultOptions = {
            id: '',
            type: 'text'
        };

        return MenuItem;
    });
    _registerModule(_modules, 'Dashboards/EditMode/Menu/MenuItemBindings.js', [], function () {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const MenuItemBindings = {
            /* *
            *
            *  Context menu
            *
            * */
            viewFullscreen: {
                id: 'viewFullscreen',
                type: 'button',
                langKey: 'viewFullscreen',
                events: {
                    click: function () {
                        const fullScreen = this.menu.editMode.board.fullscreen;
                        if (fullScreen) {
                            fullScreen.toggle();
                        }
                    }
                }
            }
        };

        return MenuItemBindings;
    });
    _registerModule(_modules, 'Dashboards/EditMode/Menu/Menu.js', [_modules['Dashboards/EditMode/EditGlobals.js'], _modules['Core/Utilities.js'], _modules['Dashboards/EditMode/Menu/MenuItem.js'], _modules['Dashboards/EditMode/Menu/MenuItemBindings.js']], function (EditGlobals, U, MenuItem, MenuItemBindings) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { createElement, merge } = U;
        class Menu {
            /* *
            *
            *  Constructor
            *
            * */
            constructor(parentElement, options, editMode, parent) {
                this.parentElement = parentElement;
                this.isVisible = false;
                this.activeItems = [];
                this.options = options;
                this.items = {};
                this.editMode = editMode;
                if (parent) {
                    this.parent = parent;
                }
                this.container = this.setContainer();
            }
            /* *
            *
            *  Functions
            *
            * */
            setContainer() {
                return createElement('div', {
                    className: EditGlobals.classNames.menu +
                        ' ' + (this.options.className || '')
                }, {}, this.parentElement);
            }
            // ItemsSchemas - default items definitions.
            initItems(itemsSchemas, activeItems) {
                const menu = this, optionsItems = menu.options.items || [];
                let itemSchema, itemConfig, item, options;
                for (let i = 0, iEnd = optionsItems.length; i < iEnd; ++i) {
                    itemConfig = optionsItems[i];
                    itemSchema =
                        typeof itemConfig === 'string' ? itemsSchemas[itemConfig] :
                            itemConfig.id ? itemsSchemas[itemConfig.id] :
                                {};
                    options = typeof itemConfig === 'string' ?
                        merge(itemSchema, { id: itemConfig }) :
                        merge(itemSchema, itemConfig);
                    if (options.id) {
                        item = new MenuItem(menu, options);
                        // Save initialized item.
                        menu.items[item.options.id] = item;
                        if (activeItems) {
                            item.activate();
                            menu.activeItems.push(item);
                        }
                    }
                    else {
                        // Error - defined item needs an id.
                    }
                }
            }
            setActiveItems(items) {
                const menu = this;
                let item;
                // Deactivate items.
                for (let i = 0, iEnd = menu.activeItems.length; i < iEnd; ++i) {
                    if (items.indexOf(menu.activeItems[i].options.id) === -1) {
                        menu.activeItems[i].deactivate();
                    }
                }
                menu.activeItems.length = 0;
                for (let j = 0, jEnd = items.length; j < jEnd; ++j) {
                    item = menu.items[items[j]];
                    if (item) {
                        // Activate item.
                        if (!item.isActive) {
                            item.activate();
                        }
                        else {
                            item.update();
                        }
                        menu.activeItems.push(item);
                    }
                }
            }
            deactivateActiveItems() {
                const menu = this;
                for (let i = 0, iEnd = menu.activeItems.length; i < iEnd; ++i) {
                    menu.activeItems[i].deactivate();
                }
            }
            updateActiveItems() {
                const activeItems = this.activeItems;
                for (let i = 0, iEnd = activeItems.length; i < iEnd; ++i) {
                    activeItems[i].update();
                }
            }
            destroy() {
                this.activeItems.length = 0;
                this.container.remove();
                this.items = {};
                this.options = {};
            }
        }
        /* *
        *
        *  Static Properties
        *
        * */
        Menu.items = MenuItemBindings;

        return Menu;
    });
    _registerModule(_modules, 'Dashboards/EditMode/Toolbar/EditToolbar.js', [_modules['Core/Utilities.js'], _modules['Dashboards/EditMode/Menu/Menu.js']], function (U, Menu) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { defined, createElement, css } = U;
        /**
         * Abstract Class of Edit Toolbar.
         * @internal
         */
        class EditToolbar {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(editMode, options) {
                this.container = createElement('div', {
                    className: options.className
                }, void 0, editMode.board.container);
                this.editMode = editMode;
                this.iconURLPrefix = editMode.iconsURLPrefix;
                this.menu = new Menu(this.container, options.menu, editMode, this);
                this.options = options;
                this.isVisible = false;
                if (this.options.outline) {
                    this.outline = createElement('div', {
                        className: options.outlineClassName
                    }, void 0, this.container);
                }
            }
            /* *
             *
             *  Functions
             *
             * */
            hide() {
                this.setPosition(void 0, void 0);
            }
            refreshOutline(x, y, guiElement, offset = 0) {
                const toolbar = this, guiElemCnt = (guiElement || {}).container;
                if (toolbar.outline && guiElemCnt) {
                    css(toolbar.outline, {
                        display: 'block',
                        left: x - offset + 'px',
                        top: y - offset + 'px',
                        width: guiElemCnt.offsetWidth + offset * 2 + 'px',
                        height: guiElemCnt.offsetHeight + offset * 2 + 'px'
                    });
                }
            }
            hideOutline() {
                if (this.outline) {
                    this.outline.style.display = 'none';
                }
            }
            setPosition(x, y) {
                const toolbar = this;
                if (toolbar.container) {
                    css(toolbar.container, {
                        left: (x || '-9999') + 'px',
                        top: (y || '-9999') + 'px'
                    });
                }
                toolbar.isVisible = defined(x) && defined(y);
            }
        }

        return EditToolbar;
    });
    _registerModule(_modules, 'Dashboards/EditMode/Toolbar/CellEditToolbar.js', [_modules['Core/Utilities.js'], _modules['Dashboards/EditMode/EditGlobals.js'], _modules['Dashboards/EditMode/Toolbar/EditToolbar.js'], _modules['Dashboards/Layout/GUIElement.js']], function (U, EditGlobals, EditToolbar, GUIElement) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { merge, fireEvent, objectEach } = U;
        /**
         * @internal
         */
        class CellEditToolbar extends EditToolbar {
            static getItemsConfig(options, iconURLPrefix) {
                const items = [];
                if (options.dragDrop?.enabled) {
                    items.push({
                        id: 'drag',
                        type: 'icon',
                        icon: iconURLPrefix + 'drag.svg',
                        events: {
                            onmousedown: function (e) {
                                const cellEditToolbar = this.menu
                                    .parent;
                                const dragDrop = cellEditToolbar.editMode.dragDrop;
                                if (dragDrop && cellEditToolbar.cell) {
                                    dragDrop.onDragStart(e, cellEditToolbar.cell);
                                }
                            }
                        }
                    });
                }
                if (options.settings?.enabled) {
                    items.push({
                        id: 'settings',
                        type: 'icon',
                        icon: iconURLPrefix + 'settings.svg',
                        events: {
                            click: function () {
                                this.menu.parent.editMode.setEditOverlay();
                                this.menu.parent.onCellOptions();
                            }
                        }
                    });
                }
                items.push({
                    id: 'destroy',
                    type: 'icon',
                    className: EditGlobals.classNames.menuDestroy,
                    icon: iconURLPrefix + 'destroy.svg',
                    events: {
                        click: function () {
                            const parentNode = this.menu.parent, editMode = this.menu.parent.editMode, popup = editMode.confirmationPopup;
                            popup.show({
                                confirmButton: {
                                    value: editMode.lang.confirmButton,
                                    callback: parentNode.onCellDestroy,
                                    context: parentNode
                                },
                                cancelButton: {
                                    value: editMode.lang.cancelButton,
                                    callback: () => {
                                        popup.closePopup();
                                    }
                                },
                                text: editMode.lang.confirmDestroyCell
                            });
                        }
                    }
                });
                return items;
            }
            /* *
             *
             *  Constructor
             *
             * */
            constructor(editMode) {
                super(editMode, merge(CellEditToolbar.defaultOptions, (editMode.options.toolbars || {}).cell, {
                    menu: {
                        items: CellEditToolbar.getItemsConfig(editMode.options, editMode.iconsURLPrefix)
                    }
                }));
                this.menu.initItems({});
            }
            /* *
             *
             *  Functions
             *
             * */
            showToolbar(cell) {
                const toolbar = this, cellCnt = cell.container, toolbarWidth = 30, toolbarMargin = 10;
                let x, y;
                if (cellCnt &&
                    toolbar.editMode.isActive() &&
                    !(toolbar.editMode.dragDrop || {}).isActive) {
                    const cellOffsets = GUIElement.getOffsets(cell, toolbar.editMode.board.container);
                    x = cellOffsets.right - toolbarWidth - toolbarMargin;
                    y = cellOffsets.top + toolbarMargin;
                    // Temp - activate all items.
                    objectEach(toolbar.menu.items, (item) => {
                        item.activate();
                    });
                    toolbar.setPosition(x, y);
                    toolbar.cell = cell;
                    toolbar.refreshOutline();
                }
                else if (toolbar.isVisible) {
                    toolbar.hide();
                }
            }
            refreshOutline() {
                const toolbar = this, offsetWidth = -1;
                if (toolbar.cell && toolbar.cell.container && toolbar.outline) {
                    super.refreshOutline(-toolbar.cell.container.offsetWidth, 0, this.cell, offsetWidth);
                }
            }
            onCellOptions() {
                const toolbar = this;
                if (toolbar.editMode.sidebar) {
                    toolbar.editMode.sidebar.show(toolbar.cell);
                    if (this.cell) {
                        this.cell.setHighlight();
                    }
                }
            }
            onCellDestroy() {
                const toolbar = this;
                if (toolbar.cell) {
                    const row = toolbar.cell.row;
                    toolbar.resetEditedCell();
                    toolbar.cell.destroy();
                    toolbar.cell = void 0;
                    // Hide row and cell toolbars.
                    toolbar.editMode.hideToolbars(['cell', 'row']);
                    // Call cellResize dashboard event.
                    if (row && row.cells && row.cells.length) {
                        fireEvent(toolbar.editMode.board, 'cellResize', {
                            cell: row.cells[0]
                        });
                        fireEvent(row, 'cellChange', { cell: row.cells[0], row });
                    }
                }
            }
            resetEditedCell() {
                this.editedCell = void 0;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        CellEditToolbar.defaultOptions = {
            enabled: true,
            className: EditGlobals.classNames.editToolbar,
            outline: false,
            outlineClassName: EditGlobals.classNames.editToolbarCellOutline,
            menu: {
                className: EditGlobals.classNames.editToolbarCell,
                itemsClassName: EditGlobals.classNames.editToolbarItem,
                items: []
            }
        };

        return CellEditToolbar;
    });
    _registerModule(_modules, 'Dashboards/EditMode/Toolbar/RowEditToolbar.js', [_modules['Core/Utilities.js'], _modules['Dashboards/EditMode/EditGlobals.js'], _modules['Dashboards/EditMode/Toolbar/EditToolbar.js'], _modules['Dashboards/Layout/GUIElement.js']], function (U, EditGlobals, EditToolbar, GUIElement) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { merge, objectEach } = U;
        /**
         * @internal
         */
        class RowEditToolbar extends EditToolbar {
            static getMenuItemsConfig(options, iconURLPrefix) {
                const items = [];
                if (options.dragDrop?.enabled) {
                    items.push({
                        id: 'drag',
                        type: 'icon',
                        icon: iconURLPrefix + 'drag.svg',
                        events: {
                            onmousedown: function (e) {
                                const rowEditToolbar = this.menu
                                    .parent, dragDrop = rowEditToolbar.editMode.dragDrop;
                                if (dragDrop && rowEditToolbar.row) {
                                    dragDrop.onDragStart(e, rowEditToolbar.row);
                                }
                            }
                        }
                    });
                }
                if (options.settings?.enabled) {
                    items.push({
                        id: 'settings',
                        type: 'icon',
                        icon: iconURLPrefix + 'settings.svg',
                        events: {
                            click: function () {
                                this.menu.parent.editMode.setEditOverlay();
                                this.menu.parent.onRowOptions();
                            }
                        }
                    });
                }
                items.push({
                    id: 'destroy',
                    type: 'icon',
                    className: EditGlobals.classNames.menuDestroy,
                    icon: iconURLPrefix + 'destroy.svg',
                    events: {
                        click: function () {
                            const parentNode = this.menu.parent, editMode = this.menu.parent.editMode, popup = editMode.confirmationPopup;
                            popup.show({
                                confirmButton: {
                                    value: editMode.lang.confirmButton,
                                    callback: parentNode.onRowDestroy,
                                    context: parentNode
                                },
                                cancelButton: {
                                    value: editMode.lang.cancelButton,
                                    callback: () => {
                                        popup.closePopup();
                                    }
                                },
                                text: editMode.lang.confirmDestroyRow
                            });
                        }
                    }
                });
                return items;
            }
            /* *
             *
             *  Constructor
             *
             * */
            constructor(editMode) {
                super(editMode, merge(RowEditToolbar.defaultOptions, (editMode.options.toolbars || {}).row, {
                    menu: {
                        items: RowEditToolbar.getMenuItemsConfig(editMode.options, editMode.iconsURLPrefix)
                    }
                }));
                this.menu.initItems({});
            }
            /* *
             *
             *  Functions
             *
             * */
            refreshOutline(x, y) {
                const toolbar = this, offsetWidth = 2;
                if (toolbar.row && toolbar.row.container) {
                    super.refreshOutline(x, y, this.row, offsetWidth);
                }
            }
            showToolbar(row) {
                const toolbar = this, rowCnt = row.container;
                let x, y, offsetX;
                if (rowCnt &&
                    toolbar.editMode.isActive() &&
                    !(toolbar.editMode.dragDrop || {}).isActive) {
                    const rowOffsets = GUIElement.getOffsets(row, toolbar.editMode.board.container);
                    const rowWidth = rowOffsets.right - rowOffsets.left;
                    // Temp - activate all items.
                    objectEach(toolbar.menu.items, (item) => {
                        item.activate();
                    });
                    offsetX = rowWidth / 2 - toolbar.container.clientWidth / 2;
                    x = rowOffsets.left + offsetX;
                    y = rowOffsets.top - toolbar.container.clientHeight;
                    toolbar.setPosition(x, y);
                    toolbar.row = row;
                    toolbar.refreshOutline(-offsetX, toolbar.container.clientHeight);
                }
                else if (toolbar.isVisible) {
                    toolbar.hide();
                }
            }
            onRowOptions() {
                const toolbar = this;
                if (toolbar.editMode.sidebar) {
                    toolbar.editMode.sidebar.show(toolbar.row);
                    /// toolbar.editMode.sidebar.updateTitle('ROW OPTIONS');
                    // @ToDo - mask is buggy - should be refactored or removed.
                    // if (this.row) {
                    //     super.maskNotEditedElements(
                    //         this.row,
                    //         true
                    //     );
                    //     this.editedRow = this.row;
                    // }
                }
            }
            onRowDestroy() {
                const toolbar = this;
                if (toolbar.row) {
                    this.resetEditedRow();
                    toolbar.row.destroy();
                    toolbar.row = void 0;
                    // Hide row and cell toolbars.
                    toolbar.editMode.hideToolbars(['cell', 'row']);
                }
            }
            resetEditedRow() {
                /// super.resetCurrentElements(this.row as Row, true);
                this.editedRow = void 0;
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        RowEditToolbar.defaultOptions = {
            enabled: true,
            className: EditGlobals.classNames.editToolbar,
            outline: true,
            outlineClassName: EditGlobals.classNames.editToolbarRowOutline,
            menu: {
                className: EditGlobals.classNames.editToolbarRow,
                itemsClassName: EditGlobals.classNames.editToolbarItem,
                items: []
            }
        };

        return RowEditToolbar;
    });
    _registerModule(_modules, 'Dashboards/EditMode/AccordionMenu.js', [_modules['Dashboards/EditMode/EditRenderer.js'], _modules['Core/Utilities.js'], _modules['Dashboards/EditMode/EditGlobals.js']], function (EditRenderer, U, EditGlobals) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Pawel Lysy
         *  - Sebastian Bochan
         *
         * */
        const { createElement, merge, error } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Accordion menu class.
         */
        class AccordionMenu {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(iconsURLPrefix, closeSidebar) {
                this.changedOptions = {};
                this.chartOptionsJSON = {};
                this.iconsURLPrefix = iconsURLPrefix;
                this.closeSidebar = closeSidebar;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Renders the menu for given component.
             *
             * @param container
             * The HTML Element to render the menu in.
             * @param component
             * The component to render the menu for.
             */
            renderContent(container, component) {
                const menu = this;
                const editableOptions = component.editableOptions.getOptions();
                let option, content;
                const accordionContainer = createElement('div', {
                    className: EditGlobals.classNames.accordionMenu
                }, {}, container);
                for (let i = 0, end = editableOptions.length; i < end; i++) {
                    option = editableOptions[i];
                    content = EditRenderer.renderCollapseHeader(accordionContainer, {
                        name: option.name,
                        iconsURLPrefix: menu.iconsURLPrefix,
                        lang: (component.board?.editMode || EditGlobals).lang
                    }).content;
                    this.renderAccordion(option, content, component);
                }
                const buttonContainer = createElement('div', {
                    className: EditGlobals.classNames.accordionMenuButtonsContainer
                }, {}, accordionContainer);
                EditRenderer.renderButton(buttonContainer, {
                    text: (component.board?.editMode || EditGlobals)
                        .lang.confirmButton,
                    className: EditGlobals.classNames.popupConfirmBtn,
                    callback: () => {
                        const changedOptions = this
                            .changedOptions;
                        component.update(merge(changedOptions, {
                            chartOptions: this.chartOptionsJSON
                        }));
                        menu.changedOptions = {};
                        menu.chartOptionsJSON = {};
                        menu.closeSidebar();
                    }
                });
                EditRenderer.renderButton(buttonContainer, {
                    text: (component.board?.editMode || EditGlobals)
                        .lang.cancelButton,
                    className: EditGlobals.classNames.popupCancelBtn,
                    callback: () => {
                        menu.changedOptions = {};
                        menu.chartOptionsJSON = {};
                        menu.closeSidebar();
                    }
                });
            }
            /**
             * Update the options object with new nested value, based on the property
             * path. If the objects in the path are not defined, the function will
             * create them.
             *
             * @param propertyPath
             * Path of the property for which the value should be updated.
             * Example: ```['chartOptions', 'chart', 'type']```
             * @param value
             * New value of the property.
             */
            updateOptions(propertyPath, value) {
                const pathLength = propertyPath.length - 1;
                let currentLevel = this.changedOptions;
                if (pathLength === 0 && propertyPath[0] === 'chartOptions') {
                    try {
                        const parsedValue = JSON.parse(value);
                        this.chartOptionsJSON = parsedValue;
                    }
                    catch (e) {
                        // TODO: Handle the wrong config passed from the user.
                        error('Dashboards Error: Wrong JSON config structure passed as' +
                            ' a chart options.');
                    }
                }
                for (let i = 0; i < pathLength; i++) {
                    const key = propertyPath[i];
                    if (!currentLevel[key]) {
                        currentLevel[key] = {};
                    }
                    currentLevel = currentLevel[key];
                }
                currentLevel[propertyPath[pathLength]] = value;
            }
            /**
             * Renders either a basic or nested element. This function can be recursivly
             * called, if there are multiple nested options.
             *
             * @param options
             * Configuration object of the Component options.
             * @param parentNode
             * A container where the accordion is rendered.
             * @param component
             * the component for which the menu should be rendered.
             */
            renderAccordion(options, parentNode, component) {
                if (options.type === 'nested') {
                    return this.renderNested(parentNode, options, component);
                }
                const renderFunction = EditRenderer.getRendererFunction(options.type);
                if (!renderFunction) {
                    return;
                }
                renderFunction(parentNode, {
                    ...options,
                    iconsURLPrefix: this.iconsURLPrefix,
                    value: component.getEditableOptionValue(options.propertyPath),
                    onchange: (value) => this.updateOptions(options.propertyPath || [], value)
                });
            }
            /**
             * Render nested menu for the component.
             *
             * @param parentElement
             * HTML element to which the nested structure should be rendered to
             * @param options
             * configuration object for the options
             * @param component
             * The component instance for the options should be rendered
             */
            renderNested(parentElement, options, component) {
                if (!parentElement || !options.nestedOptions) {
                    return;
                }
                const nestedOptions = options.nestedOptions;
                for (let i = 0, iEnd = nestedOptions.length; i < iEnd; ++i) {
                    const name = nestedOptions[i].name;
                    const accordionOptions = nestedOptions[i].options;
                    const showToggle = !!nestedOptions[i].showToggle;
                    const propertyPath = nestedOptions[i].propertyPath || [];
                    const collapsedHeader = EditRenderer.renderCollapseHeader(parentElement, {
                        name,
                        isEnabled: !!component.getEditableOptionValue(propertyPath),
                        iconsURLPrefix: this.iconsURLPrefix,
                        showToggle: showToggle,
                        onchange: (value) => this.updateOptions(propertyPath, value),
                        isNested: true,
                        lang: (component.board?.editMode || EditGlobals).lang
                    });
                    for (let j = 0, jEnd = accordionOptions.length; j < jEnd; ++j) {
                        this.renderAccordion(accordionOptions[j], collapsedHeader.content, component);
                    }
                }
                return;
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return AccordionMenu;
    });
    _registerModule(_modules, 'Shared/BaseForm.js', [_modules['Core/Renderer/HTML/AST.js'], _modules['Core/Utilities.js']], function (AST, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Imports
         *
         * */
        const { addEvent, createElement } = U;
        /* *
         *
         *  Class
         *
         * */
        class BaseForm {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(parentDiv, iconsURL) {
                this.iconsURL = iconsURL;
                this.container = this.createPopupContainer(parentDiv);
                this.closeButton = this.addCloseButton();
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Create popup div container.
             *
             * @param {HTMLElement} parentDiv
             * Parent div to attach popup.
             *
             * @param  {string} className
             * Class name of the popup.
             *
             * @return {HTMLElement}
             * Popup div.
             */
            createPopupContainer(parentDiv, className = 'highcharts-popup highcharts-no-tooltip') {
                return createElement('div', { className }, void 0, parentDiv);
            }
            /**
             * Create HTML element and attach click event to close popup.
             *
             * @param {string} className
             * Class name of the close button.
             *
             * @return {HTMLElement}
             * Close button.
             */
            addCloseButton(className = 'highcharts-popup-close') {
                const popup = this, iconsURL = this.iconsURL;
                // Create close popup button.
                const closeButton = createElement('button', { className }, void 0, this.container);
                closeButton.style['background-image'] = 'url(' +
                    (iconsURL.match(/png|svg|jpeg|jpg|gif/ig) ?
                        iconsURL : iconsURL + 'close.svg') + ')';
                ['click', 'touchstart'].forEach((eventName) => {
                    addEvent(closeButton, eventName, popup.closeButtonEvents.bind(popup));
                });
                // Close popup when press ESC
                addEvent(document, 'keydown', function (event) {
                    if (event.code === 'Escape') {
                        popup.closeButtonEvents();
                    }
                });
                return closeButton;
            }
            /**
             * Close button events.
             * @return {void}
             */
            closeButtonEvents() {
                this.closePopup();
            }
            /**
             * Reset content of the current popup and show.
             *
             * @param {string} toolbarClass
             * Class name of the toolbar which styles should be reset.
             */
            showPopup(toolbarClass = 'highcharts-annotation-toolbar') {
                const popupDiv = this.container, popupCloseButton = this.closeButton;
                this.type = void 0;
                // Reset content.
                popupDiv.innerHTML = AST.emptyHTML;
                // Reset toolbar styles if exists.
                if (popupDiv.className.indexOf(toolbarClass) >= 0) {
                    popupDiv.classList.remove(toolbarClass);
                    // Reset toolbar inline styles
                    popupDiv.removeAttribute('style');
                }
                // Add close button.
                popupDiv.appendChild(popupCloseButton);
                popupDiv.style.display = 'block';
                popupDiv.style.height = '';
            }
            /**
             * Hide popup.
             */
            closePopup() {
                this.container.style.display = 'none';
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return BaseForm;
    });
    _registerModule(_modules, 'Dashboards/EditMode/SidebarPopup.js', [_modules['Dashboards/EditMode/AccordionMenu.js'], _modules['Shared/BaseForm.js'], _modules['Dashboards/Actions/Bindings.js'], _modules['Dashboards/EditMode/EditGlobals.js'], _modules['Dashboards/EditMode/EditRenderer.js'], _modules['Dashboards/Layout/GUIElement.js'], _modules['Dashboards/Layout/Layout.js'], _modules['Core/Utilities.js']], function (AccordionMenu, BaseForm, Bindings, EditGlobals, EditRenderer, GUIElement, Layout, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  Pawel Lysy
         *
         * */
        const { addEvent, createElement, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        /**
         * Class which creates the sidebar and handles its behavior.
         *
         * @internal
         */
        class SidebarPopup extends BaseForm {
            /* *
             *
             *  Constructor
             *
             * */
            /**
             * Constructor of the SidebarPopup class.
             *
             * @param parentDiv
             * Element to which the sidebar will be appended.
             *
             * @param iconsURL
             * URL to the icons.
             *
             * @param editMode
             * Instance of EditMode.
             */
            constructor(parentDiv, iconsURL, editMode) {
                super(parentDiv, iconsURL);
                /**
                 * Options used in the sidebar.
                 */
                this.options = {
                    components: ['HTML', 'layout', 'Highcharts', 'DataGrid', 'KPI']
                };
                /**
                 * Whether the sidebar is visible.
                 */
                this.isVisible = false;
                /**
                 * List of components that can be added to the board.
                 */
                this.componentsList = [];
                this.editMode = editMode;
                this.options = merge(this.options, editMode.options.toolbars?.sidebar || {});
                this.componentsList = this.getComponentsList(this.options.components || []);
                this.accordionMenu = new AccordionMenu(this.iconsURL, this.hide.bind(this));
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Function to detect on which side of the screen should the sidebar be.
             *
             * @param context
             * The cell or row which is the context of the sidebar.
             *
             * @returns
             * Whether the sidebar should be on the right side of the screen.
             */
            detectRightSidebar(context) {
                const editMode = this.editMode;
                const layoutWrapper = editMode.board.layoutsWrapper;
                if (!layoutWrapper) {
                    return false;
                }
                return GUIElement.getOffsets(context, layoutWrapper).left < ((layoutWrapper.offsetWidth / 2) - 10); // 10 = snap
            }
            /**
             * Function to remove the class names from the sidebar.
             */
            removeClassNames() {
                const classNames = EditGlobals.classNames, classList = this.container.classList;
                classList.remove(classNames.editSidebarShow);
                classList.remove(classNames.editSidebarRightShow);
            }
            /**
             * Function to add the class names to the sidebar depending on the position
             * of the sidebar.
             *
             * @param isRightSidebar
             * Whether the sidebar should be on the right side of the screen.
             */
            addClassNames(isRightSidebar) {
                const classList = this.container.classList;
                if (isRightSidebar) {
                    classList.add(EditGlobals.classNames.editSidebarRight);
                }
                else {
                    classList.remove(EditGlobals.classNames.editSidebarRight);
                }
                setTimeout(() => {
                    classList.add(EditGlobals.classNames[isRightSidebar ? 'editSidebarRightShow' : 'editSidebarShow']);
                });
            }
            /**
             * Function to show the sidebar.
             *
             * @param context
             * The cell or row which is the context of the sidebar.
             */
            show(context) {
                const editMode = this.editMode, isRightSidebar = !!(context && this.detectRightSidebar(context));
                this.showPopup(EditGlobals.classNames.editSidebarShow);
                this.addClassNames(isRightSidebar);
                if (editMode.resizer) {
                    editMode.resizer.disableResizer();
                }
                // Remove highlight from the row.
                if (editMode.editCellContext && editMode.editCellContext.row) {
                    editMode.editCellContext.row.setHighlight(true);
                }
                editMode.hideToolbars(['cell', 'row']);
                editMode.stopContextDetection();
                this.isVisible = true;
                this.generateContent(context);
            }
            generateContent(context) {
                // Title
                this.renderHeader(context ?
                    this.editMode.lang.settings :
                    this.editMode.lang.addComponent, '');
                if (!context) {
                    this.renderAddComponentsList();
                    return;
                }
                const type = context.getType();
                if (type === 'cell') {
                    const component = context.mountedComponent;
                    if (!component) {
                        return;
                    }
                    this.accordionMenu.renderContent(this.container, component);
                }
            }
            renderAddComponentsList() {
                const sidebar = this;
                const components = this.componentsList;
                let gridElement;
                const gridWrapper = createElement('div', {
                    className: EditGlobals.classNames.editGridItems
                }, {}, sidebar.container);
                for (let i = 0, iEnd = components.length; i < iEnd; ++i) {
                    gridElement = createElement('div', {}, {}, gridWrapper);
                    // Drag drop new component.
                    gridElement.addEventListener('mousedown', (e) => {
                        if (sidebar.editMode.dragDrop) {
                            const onMouseLeave = () => {
                                sidebar.hide();
                            };
                            sidebar.container.addEventListener('mouseleave', onMouseLeave);
                            sidebar.editMode.dragDrop.onDragStart(e, void 0, (dropContext) => {
                                // Add component if there is no layout yet.
                                if (this.editMode.board.layouts.length === 0) {
                                    const board = this.editMode.board, newLayoutName = GUIElement.createElementId('layout'), layout = new Layout(board, {
                                        id: newLayoutName,
                                        copyId: '',
                                        parentContainerId: board.container.id,
                                        rows: [{}],
                                        style: {}
                                    });
                                    if (layout) {
                                        board.layouts.push(layout);
                                    }
                                    dropContext = layout.rows[0];
                                }
                                const newCell = components[i].onDrop(sidebar, dropContext);
                                if (newCell) {
                                    const mountedComponent = newCell.mountedComponent;
                                    // Skip init connector when is not defined by
                                    // options f.e HTML component.
                                    if (mountedComponent.options?.connector?.id) {
                                        mountedComponent.initConnector();
                                    }
                                    sidebar.editMode.setEditCellContext(newCell);
                                    sidebar.show(newCell);
                                    newCell.setHighlight();
                                }
                                sidebar.container.removeEventListener('mouseleave', onMouseLeave);
                            });
                        }
                    });
                    gridElement.innerHTML = components[i].text;
                }
                return;
            }
            onDropNewComponent(dropContext, componentOptions) {
                const sidebar = this, dragDrop = sidebar.editMode.dragDrop;
                if (dragDrop) {
                    const row = (dropContext.getType() === 'cell' ?
                        dropContext.row :
                        dropContext), newCell = row.addCell({
                        id: GUIElement.createElementId('col')
                    });
                    dragDrop.onCellDragEnd(newCell);
                    const options = merge(componentOptions, {
                        cell: newCell.id
                    });
                    Bindings.addComponent(options, sidebar.editMode.board, newCell);
                    sidebar.editMode.setEditOverlay();
                    return newCell;
                }
            }
            /**
             * Function to hide the sidebar.
             */
            hide() {
                const editMode = this.editMode;
                const editCellContext = editMode.editCellContext;
                this.removeClassNames();
                this.container.style.display = 'none';
                // Remove edit overlay if active.
                if (editMode.isEditOverlayActive) {
                    editMode.setEditOverlay(true);
                }
                if (editCellContext && editCellContext.row) {
                    editMode.showToolbars(['cell', 'row'], editCellContext);
                    editCellContext.row.setHighlight();
                    // Remove cell highlight if active.
                    if (editCellContext.isHighlighted) {
                        editCellContext.setHighlight(true);
                    }
                }
                editMode.isContextDetectionActive = true;
                this.isVisible = false;
            }
            /**
             * Function called when the close button is pressed.
             */
            closeButtonEvents() {
                this.hide();
            }
            renderHeader(title, iconURL) {
                const icon = EditRenderer.renderIcon(this.container, {
                    icon: iconURL,
                    className: EditGlobals.classNames.editSidebarTitle
                });
                if (icon) {
                    icon.textContent = title;
                }
            }
            /**
             * Based on the provided components list, it returns the list of components
             * with its names and functions that are called when the component is
             * dropped.
             *
             * @param components
             * List of components that can be added to the board.
             */
            getComponentsList(components) {
                const sidebar = this, editMode = sidebar.editMode, componentTypes = editMode.board.componentTypes, componentList = [];
                components.forEach((componentName) => {
                    const component = componentTypes[componentName];
                    if (component) {
                        componentList.push({
                            text: editMode.lang?.sidebar[componentName] ||
                                component.name,
                            onDrop: function (sidebar, dropContext) {
                                const options = component.prototype.getOptionsOnDrop(sidebar);
                                if (options) {
                                    return sidebar.onDropNewComponent(dropContext, options);
                                }
                            }
                        });
                    }
                    else if (componentName === 'layout') {
                        componentList.push(SidebarPopup.addLayout);
                    }
                });
                return componentList;
            }
            /**
             * Function to create and add the close button to the sidebar.
             *
             * @param className
             * Class name of the close button.
             * @returns Close button element
             */
            addCloseButton(className = EditGlobals.classNames.popupCloseButton) {
                // Close popup when click outside the popup
                addEvent(document, 'click', (event) => {
                    event.stopPropagation();
                    if (this.container.style.display === 'block' &&
                        !this.container.contains(event.target) &&
                        this.container.classList.value.includes('show')) {
                        this.hide();
                    }
                });
                return super.addCloseButton.call(this, className);
            }
            /**
             * Function that creates the container of the sidebar.
             *
             * @param parentDiv
             * The parent div to which the sidebar will be appended.
             * @param className
             * Class name of the sidebar.
             * @returns The container of the sidebar.
             */
            createPopupContainer(parentDiv, className = EditGlobals.classNames.editSidebar) {
                return super.createPopupContainer.call(this, parentDiv, className);
            }
        }
        SidebarPopup.addLayout = {
            text: 'layout',
            onDrop: function (sidebar, dropContext) {
                if (!dropContext) {
                    return;
                }
                const row = (dropContext.getType() === 'cell' ?
                    dropContext.row :
                    dropContext), board = row.layout.board, newLayoutName = GUIElement.createElementId('layout'), cellName = GUIElement.createElementId('cell'), layout = new Layout(board, {
                    id: newLayoutName,
                    copyId: '',
                    parentContainerId: board.container.id,
                    rows: [{
                            cells: [{
                                    id: cellName
                                }]
                        }],
                    style: {}
                });
                if (layout) {
                    board.layouts.push(layout);
                }
                Bindings.addComponent({
                    type: 'HTML',
                    cell: cellName,
                    elements: [
                        {
                            tagName: 'div',
                            textContent: 'Placeholder text'
                        }
                    ]
                }, board);
            }
        };
        /* *
         *
         *  Default Export
         *
         * */

        return SidebarPopup;
    });
    _registerModule(_modules, 'Dashboards/EditMode/EditContextMenu.js', [_modules['Dashboards/EditMode/EditGlobals.js'], _modules['Core/Utilities.js'], _modules['Dashboards/EditMode/Menu/Menu.js']], function (EditGlobals, U, Menu) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { addEvent, merge } = U;
        /**
         * Class to create context menu.
         * @internal
         */
        class EditContextMenu extends Menu {
            /* *
             *
             *  Constructor
             *
             * */
            constructor(parentElement, options, editMode) {
                super(editMode.board.container, merge(EditContextMenu.defaultOptions, options || {}), editMode);
                this.editMode = editMode;
                this.options = merge(EditContextMenu.defaultOptions, options || {});
                // Move it in the DOM after the edit tools so it is better accessible.
                this.editMode.board.layoutsWrapper?.parentNode.insertBefore(this.container, this.editMode.board.layoutsWrapper);
                // Set the context menu container width.
                this.container.style.width = this.options.width + 'px';
                super.initItems(EditContextMenu.items);
                if (this.options.items) {
                    const items = [];
                    for (let i = 0, iEnd = this.options.items.length; i < iEnd; ++i) {
                        if (typeof this.options.items[i] === 'string') {
                            items.push(this.options.items[i]);
                        }
                        else if (this.options.items[i].id) {
                            items.push(this.options.items[i].id);
                        }
                    }
                    this.setActiveItems(items);
                }
                this.initEvents();
            }
            /* *
            *
            *  Functions
            *
            * */
            initEvents() {
                const contextMenu = this;
                // Click on document close the context menu
                // TODO refactor
                addEvent(document, 'click', (event) => {
                    if (event.target !== this.container &&
                        event.target !==
                            contextMenu.editMode.tools.contextButtonElement &&
                        !event.target.classList
                            .contains(EditGlobals.classNames.toggleSlider) &&
                        event.target.tagName !== 'INPUT' &&
                        this.isVisible) {
                        this.setVisible(false);
                    }
                });
            }
            setVisible(visible) {
                const contextMenu = this, contextButtonElement = contextMenu.editMode.tools.contextButtonElement;
                if (contextMenu.container && contextButtonElement) {
                    if (visible) {
                        contextMenu.container.style.display = 'block';
                        contextMenu.isVisible = true;
                        contextButtonElement.setAttribute('aria-expanded', 'true');
                    }
                    else {
                        contextMenu.container.style.display = 'none';
                        contextMenu.isVisible = false;
                        contextButtonElement.setAttribute('aria-expanded', 'false');
                    }
                }
            }
            updatePosition(ctxButton, x, y) {
                const contextMenu = this, width = contextMenu.options.width || 0, left = (ctxButton ?
                    ctxButton.offsetLeft - width + ctxButton.offsetWidth :
                    x), top = ctxButton ? ctxButton.offsetTop + ctxButton.offsetHeight : y;
                if (left && top) {
                    contextMenu.container.style.left = left + 'px';
                    contextMenu.container.style.top = top + 'px';
                }
            }
        }
        /* *
        *
        *  Static Properties
        *
        * */
        EditContextMenu.defaultOptions = {
            enabled: true,
            width: 150,
            className: EditGlobals.classNames.contextMenu,
            itemsClassName: EditGlobals.classNames.contextMenuItem,
            items: ['editMode']
        };
        /**
         * Default Context menu items.
         */
        EditContextMenu.items = merge(Menu.items, {
            editMode: {
                id: 'editMode',
                type: 'toggle',
                getValue: function (item) {
                    return item.menu.editMode.isActive();
                },
                langKey: 'editMode',
                events: {
                    click: function () {
                        this.menu.editMode.onEditModeToggle();
                    }
                }
            }
        });

        return EditContextMenu;
    });
    _registerModule(_modules, 'Dashboards/Actions/ContextDetection.js', [_modules['Core/Utilities.js'], _modules['Dashboards/Layout/GUIElement.js']], function (U, GUIElement) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { defined } = U;
        class ContextDetection {
            static isGUIElementOnParentEdge(mouseContext, side // 'right', 'left', 'top', 'bottom'
            ) {
                const visibleElements = (side === 'top' || side === 'bottom') ?
                    mouseContext.row.layout.getVisibleRows() :
                    (side === 'left' || side === 'right') ?
                        mouseContext.row.getVisibleCells() :
                        [];
                const lastElementIndex = (visibleElements.length - 1);
                return ((visibleElements[lastElementIndex] === mouseContext &&
                    side === 'right') ||
                    (visibleElements[lastElementIndex] === mouseContext.row &&
                        side === 'bottom') ||
                    (visibleElements[0] === mouseContext && side === 'left') ||
                    (visibleElements[0] === mouseContext.row && side === 'top'));
            }
            static getContextLevel(mouseContext, offset, sideOffset, side) {
                // Array of overlapped levels.
                const overlappedLevels = mouseContext.getOverlappingLevels(side, offset / 2);
                // Divide offset to level sections (eg 3 nested layouts -
                // cell edge will have 3 sections each 1/3 offset width).
                const divOffset = offset / overlappedLevels.length;
                // Overlapped nested layout level.
                const lastOverlappedLevel = overlappedLevels[overlappedLevels.length - 1];
                let level = mouseContext.row.layout.level - Math.floor(sideOffset / divOffset);
                level = level < lastOverlappedLevel ? lastOverlappedLevel : (level > mouseContext.row.layout.level ?
                    mouseContext.row.layout.level : level);
                return level;
            }
            static getContext(mouseCellContext, e, offset) {
                let sideOffset;
                // Get cell offsets, width, height
                const mouseCellContextOffsets = GUIElement.getOffsets(mouseCellContext);
                const { width, height } = GUIElement.getDimFromOffsets(mouseCellContextOffsets);
                // Correct offset when element to small.
                if (width < 2 * offset) {
                    offset = width / 2;
                }
                // Get mouse position relative to the mouseContext sides.
                const leftSideX = e.clientX - mouseCellContextOffsets.left;
                const topSideY = e.clientY - mouseCellContextOffsets.top;
                // Get cell side - right, left, top, bottom
                const sideY = topSideY >= -offset && topSideY <= offset ? 'top' :
                    topSideY - height >= -offset && topSideY - height <= offset ?
                        'bottom' :
                        '';
                const sideX = leftSideX >= -offset && leftSideX <= offset ? 'left' :
                    leftSideX - width >= -offset && leftSideX - width <= offset ?
                        'right' :
                        '';
                const side = sideX ? sideX : sideY; // X is prioritized.
                switch (side) {
                    case 'right':
                        sideOffset = leftSideX - width + offset;
                        break;
                    case 'left':
                        sideOffset = offset - leftSideX;
                        break;
                    case 'top':
                        sideOffset = offset - topSideY;
                        break;
                    case 'bottom':
                        sideOffset = topSideY - height + offset;
                        break;
                }
                const context = {
                    cell: mouseCellContext,
                    side: side
                };
                // Nested layouts.
                if (mouseCellContext.row.layout.level !== 0 &&
                    side &&
                    ContextDetection.isGUIElementOnParentEdge(mouseCellContext, side) &&
                    defined(sideOffset)) {
                    const level = ContextDetection.getContextLevel(mouseCellContext, offset, sideOffset, side);
                    const cell = mouseCellContext.getParentCell(level);
                    if (cell) {
                        context.cell = cell;
                    }
                }
                return context;
            }
        }

        return ContextDetection;
    });
    _registerModule(_modules, 'Dashboards/Actions/DragDrop.js', [_modules['Core/Utilities.js'], _modules['Dashboards/Globals.js'], _modules['Dashboards/EditMode/EditGlobals.js'], _modules['Dashboards/Layout/GUIElement.js'], _modules['Dashboards/Actions/ContextDetection.js']], function (U, Globals, EditGlobals, GUIElement, ContextDetection) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { addEvent, merge, css, fireEvent, createElement } = U;
        /**
         * Class providing a drag and drop functionality.
         * @internal
         */
        class DragDrop {
            /* *
             *
             *  Constructors
             *
             * */
            /**
             * Constructor for the DragDrop class.
             * @internal
             *
             * @param {EditMode} editMode
             * The parent editMode reference.
             *
             * @param {DragDrop.Options} options
             * Options for the DragDrop.
             */
            constructor(editMode, options) {
                this.editMode = editMode;
                this.options = merge(DragDrop.defaultOptions, options);
                this.mockElement = createElement('div', { className: EditGlobals.classNames.dragMock }, {}, editMode.board.container);
                this.dropPointer = {
                    isVisible: false,
                    align: '',
                    element: createElement('div', { className: EditGlobals.classNames.dropPointer }, {}, editMode.board.container)
                };
                this.isActive = false;
                this.initEvents();
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Method for showing and positioning drop pointer.
             *
             * @param {number} left
             * Drop pointer left position.
             *
             * @param {number} top
             * Drop pointer top position.
             *
             * @param {number} width
             * Drop pointer width.
             *
             * @param {number} height
             * Drop pointer height.
             */
            showDropPointer(left, top, width, height) {
                this.dropPointer.isVisible = true;
                css(this.dropPointer.element, {
                    display: 'block',
                    left: left + 'px',
                    top: top + 'px',
                    height: height + 'px',
                    width: width + 'px'
                });
            }
            /**
             * Method for hiding drop pointer.
             */
            hideDropPointer() {
                if (this.dropPointer.isVisible) {
                    this.dropPointer.isVisible = false;
                    this.dropPointer.align = '';
                    this.dropPointer.element.style.display = 'none';
                }
            }
            /**
             * Method for positioning drag mock element.
             *
             * @param {PointerEvent} mouseEvent
             * Mouse event.
             */
            setMockElementPosition(mouseEvent) {
                const dragDrop = this, dashBoundingRect = dragDrop.editMode.board.container.getBoundingClientRect(), offset = dragDrop.mockElement.clientWidth / 2, x = mouseEvent.clientX - dashBoundingRect.left - offset, y = mouseEvent.clientY - dashBoundingRect.top - offset;
                css(this.mockElement, { left: x + 'px', top: y + 'px' });
            }
            /**
             * Method for initializing drag drop events.
             */
            initEvents() {
                const dragDrop = this;
                // DragDrop events.
                addEvent(document, 'mousemove', dragDrop.onDrag.bind(dragDrop));
                addEvent(document, 'mouseup', dragDrop.onDragEnd.bind(dragDrop));
            }
            /**
             * General method used on drag start.
             *
             * @param {PointerEvent} e
             * Mouse event.
             *
             * @param {Cell|Row} context
             * Reference to the dragged context.
             *
             * @param {Function} dragEndCallback
             * Callback invoked on drag end.
             */
            onDragStart(e, context, dragEndCallback) {
                this.isActive = true;
                this.editMode.hideToolbars(['cell', 'row']);
                if (this.editMode.resizer) {
                    this.editMode.resizer.disableResizer();
                }
                this.setMockElementPosition(e);
                if (context) {
                    this.context = context;
                    context.hide();
                    if (context.getType() === Globals.guiElementType.cell) {
                        const draggedCell = context;
                        // Call cellResize board event.
                        fireEvent(this.editMode.board, 'cellResize', { cell: context });
                        fireEvent(draggedCell.row, 'cellChange', { cell: context, row: draggedCell.row });
                    }
                }
                else if (dragEndCallback) {
                    this.dragEndCallback = dragEndCallback;
                }
                css(this.mockElement, {
                    cursor: 'grabbing',
                    display: 'block'
                });
            }
            /**
             * General method used while dragging.
             *
             * @param {PointerEvent} e
             * Mouse event.
             */
            onDrag(e) {
                const dragDrop = this;
                if (dragDrop.isActive) {
                    e.preventDefault();
                    dragDrop.setMockElementPosition(e);
                    if (dragDrop.context) {
                        if (dragDrop.context.getType() ===
                            Globals.guiElementType.cell) {
                            dragDrop.onCellDrag(e);
                        }
                        else if (dragDrop.context.getType() ===
                            Globals.guiElementType.row) {
                            dragDrop.onRowDrag(e);
                        }
                    }
                    else if (dragDrop.dragEndCallback) {
                        dragDrop.onCellDrag(e);
                    }
                }
            }
            /**
             * General method used when drag finish.
             */
            onDragEnd() {
                const dragDrop = this;
                if (dragDrop.isActive) {
                    dragDrop.isActive = false;
                    css(dragDrop.mockElement, {
                        cursor: 'grab',
                        display: 'none'
                    });
                    if (dragDrop.context) {
                        if (dragDrop.context.getType() ===
                            Globals.guiElementType.cell) {
                            dragDrop.onCellDragEnd();
                        }
                        else if (dragDrop.context.getType() ===
                            Globals.guiElementType.row) {
                            dragDrop.onRowDragEnd();
                        }
                        dragDrop.context = void 0;
                        // Show toolbars and snaps.
                        if (dragDrop.editMode.editCellContext) {
                            dragDrop.editMode.showToolbars(['row', 'cell'], dragDrop.editMode.editCellContext);
                            if (dragDrop.editMode.resizer) {
                                dragDrop.editMode.resizer.setSnapPositions(dragDrop.editMode.editCellContext);
                            }
                        }
                    }
                    else if (dragDrop.dragEndCallback) {
                        dragDrop.dragEndCallback(dragDrop.dropContext);
                        dragDrop.dragEndCallback = void 0;
                        dragDrop.hideDropPointer();
                    }
                }
            }
            /**
             * Sets appropriate drop context and refresh drop pointer position when
             * row is dragged or cell is dragged as a row.
             *
             * @param {PointerEvent} e
             * Mouse event.
             *
             * @param {ContextDetection.ContextDetails} contextDetails
             * Context details (cell, side)
             */
            onRowDrag(e, contextDetails) {
                const dragDrop = this, mouseCellContext = dragDrop.mouseCellContext, dropPointerSize = dragDrop.options.dropPointerSize || 0, offset = dragDrop.options.rowDropOffset || 0;
                let updateDropPointer = false;
                if (mouseCellContext) {
                    const context = (contextDetails ||
                        ContextDetection.getContext(mouseCellContext, e, offset));
                    const align = context.side;
                    if (dragDrop.dropPointer.align !== align ||
                        dragDrop.dropContext !== context.cell.row) {
                        updateDropPointer = true;
                        dragDrop.dropPointer.align = align;
                        dragDrop.dropContext = context.cell.row;
                    }
                    if (align) {
                        const dropContextRowOffsets = GUIElement.getOffsets(dragDrop.dropContext, dragDrop.editMode.board.container);
                        const { width, height } = GUIElement
                            .getDimFromOffsets(dropContextRowOffsets);
                        // Update or show drop pointer.
                        if (!dragDrop.dropPointer.isVisible || updateDropPointer) {
                            dragDrop.showDropPointer(dropContextRowOffsets.left, dropContextRowOffsets.top + (dragDrop.dropPointer.align === 'bottom' ?
                                height :
                                0) - dropPointerSize / 2, width, dropPointerSize);
                        }
                    }
                    else {
                        dragDrop.dropContext = void 0;
                        dragDrop.hideDropPointer();
                    }
                }
            }
            /**
             * Unmounts dropped row and mounts it in a new position.
             */
            onRowDragEnd() {
                const dragDrop = this, draggedRow = dragDrop.context, dropContext = dragDrop.dropContext;
                if (dragDrop.dropPointer.align) {
                    draggedRow.layout.unmountRow(draggedRow);
                    // Destroy layout when empty.
                    if (draggedRow.layout.rows.length === 0) {
                        draggedRow.layout.destroy();
                    }
                    dropContext.layout.mountRow(draggedRow, (dropContext.layout.getRowIndex(dropContext) || 0) +
                        (dragDrop.dropPointer.align === 'bottom' ? 1 : 0));
                    // Call cellResize board event.
                    if (draggedRow.cells[0]) {
                        fireEvent(dragDrop.editMode.board, 'cellResize', { cell: draggedRow.cells[0] });
                        fireEvent(draggedRow, 'cellChange', { cell: draggedRow.cells[0], row: draggedRow });
                    }
                }
                dragDrop.hideDropPointer();
                draggedRow.show();
            }
            /**
             * Method used as middleware when cell is dragged.
             * Decides where to pass an event depending on the mouse context.
             *
             * @param {PointerEvent} e
             * Mouse event.
             *
             * @param {ContextDetection.ContextDetails} contextDetails
             * Context details (cell, side)
             */
            onCellDrag(e, contextDetails) {
                const dragDrop = this, mouseCellContext = dragDrop.mouseCellContext, offset = dragDrop.options.cellDropOffset || 0;
                if (mouseCellContext || contextDetails) {
                    dragDrop.onCellDragCellCtx(e, contextDetails ||
                        ContextDetection.getContext(mouseCellContext, e, offset));
                }
                else if (dragDrop.mouseRowContext) {
                    dragDrop.onCellDragRowCtx(e, dragDrop.mouseRowContext);
                }
            }
            /**
             * Sets appropriate drop context and refreshes the drop pointer
             * position when a cell is dragged and a cell context is detected.
             *
             * @param {PointerEvent} e
             * Mouse event.
             *
             * @param {ContextDetection.ContextDetails} context
             * Context details (cell, side)
             */
            onCellDragCellCtx(e, context) {
                const dragDrop = this, dropPointerSize = dragDrop.options.dropPointerSize || 0, align = context.side;
                let updateDropPointer = false;
                if (dragDrop.dropPointer.align !== align ||
                    dragDrop.dropContext !== context.cell) {
                    updateDropPointer = true;
                    dragDrop.dropPointer.align = align;
                    dragDrop.dropContext = context.cell;
                }
                if (align === 'right' || align === 'left') {
                    const dropContextOffsets = GUIElement.getOffsets(dragDrop.dropContext, dragDrop.editMode.board.container);
                    const { width, height } = GUIElement.getDimFromOffsets(dropContextOffsets);
                    // Update or show drop pointer.
                    if (!dragDrop.dropPointer.isVisible || updateDropPointer) {
                        const rowLevelInfo = dragDrop.dropContext.row.getRowLevelInfo(e.clientY), pointerHeight = (rowLevelInfo ?
                            (rowLevelInfo.rowLevel.bottom -
                                rowLevelInfo.rowLevel.top) :
                            height);
                        dragDrop.showDropPointer(dropContextOffsets.left + (align === 'right' ? width : 0) -
                            dropPointerSize / 2, dropContextOffsets.top, dropPointerSize, pointerHeight);
                    }
                }
                else if (align === 'top' || align === 'bottom') {
                    const dropContextOffsets = GUIElement.getOffsets(dragDrop.dropContext), rowLevelInfo = dragDrop.dropContext.row
                        .getRowLevelInfo(dropContextOffsets.top);
                    if (rowLevelInfo &&
                        ((rowLevelInfo.index === 0 && align === 'top') ||
                            (rowLevelInfo.index ===
                                rowLevelInfo.rowLevels.length - 1 &&
                                align === 'bottom'))) {
                        // Checks if a cell is dragged as a row
                        // (only when a cell edge is on a row edge)
                        dragDrop.onRowDrag(e, context);
                    }
                }
                else {
                    dragDrop.dropContext = void 0;
                    dragDrop.hideDropPointer();
                }
            }
            /**
             * Sets appropriate drop context and refreshes the drop pointer
             * position when a cell is dragged and a row context is detected.
             *
             * @param {PointerEvent} e
             * Mouse event.
             *
             * @param {Row} mouseRowContext
             * Row context.
             */
            onCellDragRowCtx(e, mouseRowContext) {
                const dragDrop = this, dropPointerSize = dragDrop.options.dropPointerSize || 0, rowOffsets = GUIElement.getOffsets(mouseRowContext), rowLevelInfo = mouseRowContext.getRowLevelInfo(e.clientY);
                let cell, cellOffsets;
                if (rowLevelInfo) {
                    for (let i = 0, iEnd = rowLevelInfo.rowLevel.cells.length; i < iEnd; ++i) {
                        cell = rowLevelInfo.rowLevel.cells[i];
                        cellOffsets = GUIElement.getOffsets(cell);
                        const { width, height } = GUIElement
                            .getDimFromOffsets(cellOffsets), dashOffsets = dragDrop.editMode.board.container
                            .getBoundingClientRect(), levelHeight = (rowLevelInfo.rowLevel.bottom -
                            rowLevelInfo.rowLevel.top);
                        if (cell.isVisible) {
                            if (height < 0.8 * levelHeight &&
                                cellOffsets.left <= e.clientX &&
                                cellOffsets.right >= e.clientX) {
                                if (cellOffsets.top > e.clientY) {
                                    // @ToDo - Mouse above the cell.
                                }
                                else if (cellOffsets.bottom < e.clientY) {
                                    // Mouse below the cell.
                                    dragDrop.showDropPointer(cellOffsets.left - dashOffsets.left, cellOffsets.top - dashOffsets.top + height, width, levelHeight - height);
                                    dragDrop.dropPointer.align = 'nestedBottom';
                                    dragDrop.dropContext = cell;
                                }
                                i = iEnd; // Stop the loop
                            }
                            else if ((i === 0 && cellOffsets.left > e.clientX) ||
                                (i === iEnd - 1 && cellOffsets.right < e.clientX)) {
                                if (cellOffsets.left > e.clientX) {
                                    // @ToDo - Mouse on the cell left side.
                                }
                                else if (cellOffsets.right < e.clientX) {
                                    // Mouse on the cell right side.
                                    const pointerWidth = rowOffsets.right - cellOffsets.right;
                                    dragDrop.showDropPointer(cellOffsets.left + ((i === 0 && cellOffsets.left > e.clientX) ?
                                        0 :
                                        width) - dropPointerSize / 2 - dashOffsets.left, cellOffsets.top - dashOffsets.top, pointerWidth > dropPointerSize ?
                                        pointerWidth :
                                        dropPointerSize, levelHeight || height);
                                    dragDrop.dropPointer.align = 'right';
                                    dragDrop.dropContext = cell;
                                }
                                i = iEnd; // Stop the loop
                            }
                        }
                        else if (!cell.isVisible && cell === dragDrop.context) {
                            // Element is not visible.
                            dragDrop.dropContext = void 0;
                            dragDrop.hideDropPointer();
                        }
                    }
                }
            }
            /**
             * Unmounts dropped cell and mounts it in a new position.
             * When cell is dragged as a row also creates a new row
             * and mounts cell there.
             *
             * @param {Cell} contextCell
             * Cell used as a dragDrop context.
             */
            onCellDragEnd(contextCell) {
                const dragDrop = this, draggedCell = contextCell || dragDrop.context;
                let dropContext = dragDrop.dropContext;
                if (dragDrop.dropPointer.align && dropContext && draggedCell) {
                    draggedCell.row.unmountCell(draggedCell);
                    // Destroy row when empty.
                    if (draggedCell.row.cells.length === 0) {
                        draggedCell.row.destroy();
                    }
                    if ((dragDrop.dropPointer.align === 'top' ||
                        dragDrop.dropPointer.align === 'bottom') &&
                        dropContext.getType() === Globals.guiElementType.row) {
                        dropContext = dropContext;
                        const newRow = dropContext.layout.addRow({}, void 0, (dropContext.layout.getRowIndex(dropContext) || 0) +
                            (dragDrop.dropPointer.align === 'bottom' ? 1 : 0));
                        newRow.mountCell(draggedCell, 0);
                    }
                    else if (dragDrop.dropPointer.align === 'nestedBottom' &&
                        dropContext.getType() === Globals.guiElementType.cell) {
                        // Create nesting.
                        const dropContextCell = dropContext;
                        const row = dropContextCell.row;
                        const dropContextCellIndex = row.getCellIndex(dropContextCell);
                        row.unmountCell(dropContextCell);
                        const newCell = row.addCell({
                            id: GUIElement.createElementId('col-nested-'),
                            layout: {
                                rows: [{}, {}]
                            }
                        }, void 0, dropContextCellIndex);
                        if (newCell.nestedLayout) {
                            newCell.nestedLayout.rows[0].mountCell(dropContextCell);
                            newCell.nestedLayout.rows[1].mountCell(draggedCell);
                        }
                    }
                    else if (dropContext.getType() === Globals.guiElementType.cell) {
                        dropContext = dropContext;
                        dropContext.row.mountCell(draggedCell, (dropContext.row.getCellIndex(dropContext) || 0) +
                            (dragDrop.dropPointer.align === 'right' ? 1 : 0));
                    }
                }
                // Call cellResize board event.
                fireEvent(dragDrop.editMode.board, 'cellResize', { cell: draggedCell });
                fireEvent(draggedCell.row, 'cellChange', { cell: draggedCell, row: draggedCell.row });
                dragDrop.hideDropPointer();
                draggedCell.show();
            }
        }
        /* *
         *
         *  Static Properties
         *
         * */
        DragDrop.defaultOptions = {
            enabled: true,
            rowDropOffset: 30,
            cellDropOffset: 30,
            dropPointerSize: 16
        };
        /* *
         *
         *  Default Export
         *
         * */

        return DragDrop;
    });
    _registerModule(_modules, 'Dashboards/Actions/Resizer.js', [_modules['Dashboards/EditMode/EditGlobals.js'], _modules['Dashboards/Layout/GUIElement.js'], _modules['Core/Utilities.js']], function (EditGlobals, GUIElement, U) {
        const { merge, addEvent, createElement, fireEvent, removeEvent } = U;
        /**
         * Class providing a resizing functionality.
         */
        class Resizer {
            /* *
            *
            *  Static Properties
            *
            * */
            /**
             * Creates a new instance of the Resizer class based on JSON.
             * @internal
             */
            static fromJSON(editMode, json) {
                return new Resizer(editMode, json.options);
            }
            /* *
            *
            *  Constructors
            *
            * */
            /**
             * Constructor for the Resizer class.
             *
             * @param {EditMode} editMode
             * The parent editMode reference.
             *
             * @param {Resizer.Options} options
             * Options for the Resizer.
             */
            constructor(editMode, options) {
                this.editMode = editMode;
                this.options = merge({}, Resizer.defaultOptions, editMode.options.resize, options);
                this.currentCell = void 0;
                this.isX = this.options.type.indexOf('x') > -1;
                this.isY = this.options.type.indexOf('y') > -1;
                this.isActive = false;
                this.startX = 0;
                this.tempSiblingsWidth = [];
                this.addSnaps();
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Add Snap - create snaps and add events.
             *
             */
            addSnaps() {
                const iconsURLPrefix = this.editMode.iconsURLPrefix;
                const snapWidth = this.options.snap.width || 0;
                const snapHeight = this.options.snap.height || 0;
                const dashboardContainer = this.editMode.board.container;
                // Right snap
                this.snapRight = createElement('img', {
                    className: EditGlobals.classNames.resizeSnap + ' ' +
                        EditGlobals.classNames.resizeSnapX,
                    src: iconsURLPrefix + 'resize-handle.svg'
                }, {
                    width: snapWidth + 'px',
                    height: snapHeight + 'px',
                    left: -9999 + 'px'
                }, dashboardContainer);
                // Bottom snap
                this.snapBottom = createElement('img', {
                    className: EditGlobals.classNames.resizeSnap + ' ' +
                        EditGlobals.classNames.resizeSnapY,
                    src: iconsURLPrefix + 'resize-handle.svg'
                }, {
                    width: snapWidth + 'px',
                    height: snapHeight + 'px',
                    top: -9999 + 'px',
                    left: '0px'
                }, dashboardContainer);
                this.addResizeEvents();
            }
            /**
             * Hide snaps
             *
             */
            disableResizer() {
                this.isActive = false;
                this.currentDimension = void 0;
                this.currentCell = void 0;
                if (this.snapRight) {
                    this.snapRight.style.left = '-9999px';
                }
                if (this.snapBottom) {
                    this.snapBottom.style.left = '-9999px';
                }
            }
            /**
             * Update snap position.
             *
             * @param cell
             * Cell reference
             */
            setSnapPositions(cell) {
                // Set current cell
                this.currentCell = cell;
                // Set position of snaps
                const cellOffsets = GUIElement.getOffsets(cell, this.editMode.board.container);
                const left = cellOffsets.left || 0;
                const top = cellOffsets.top || 0;
                const { width, height } = GUIElement.getDimFromOffsets(cellOffsets);
                const snapWidth = (this.options.snap.width || 0);
                const snapHeight = (this.options.snap.height || 0);
                if (this.snapRight) {
                    this.snapRight.style.left = (left + width - snapWidth) + 'px';
                    this.snapRight.style.top = top + (height / 2) - (snapHeight / 2) + 'px';
                }
                if (this.snapBottom) {
                    this.snapBottom.style.top = (top + height - snapHeight) + 'px';
                    this.snapBottom.style.left = (left + (width / 2) - (snapWidth / 2)) + 'px';
                }
            }
            /**
             * Method detects siblings and auto-width applied by flex. The resizer
             * requires static widths for correct calculations, so we need to apply
             * temporary width on siblings.
             */
            setTempWidthSiblings() {
                const currentCell = this.currentCell;
                if (currentCell) {
                    const cellOffsets = GUIElement.getOffsets(currentCell), rowLevelInfo = currentCell.row.getRowLevelInfo(cellOffsets.top), rowLevelCells = (rowLevelInfo && rowLevelInfo.rowLevel.cells) || [];
                    let cellContainer, cell;
                    for (let i = 0, iEnd = rowLevelCells.length; i < iEnd; ++i) {
                        cell = rowLevelCells[i];
                        cellContainer = cell.container;
                        // Do not convert width on the current cell and next siblings.
                        if (cell === currentCell) {
                            break;
                        }
                        if (cellContainer) {
                            cellContainer.style.flex =
                                '0 0 ' + cellContainer.offsetWidth + 'px';
                            this.tempSiblingsWidth.push(cell);
                        }
                    }
                }
            }
            /**
             * Revert widths to auto.
             */
            revertSiblingsAutoWidth() {
                const tempSiblingsWidth = this.tempSiblingsWidth;
                let cellContainer, cellResize;
                for (let i = 0, iEnd = tempSiblingsWidth.length; i < iEnd; ++i) {
                    cellContainer = tempSiblingsWidth[i].container;
                    if (cellContainer) {
                        cellContainer.style.flex = '1 1 0%';
                        cellResize = tempSiblingsWidth[i];
                    }
                }
                this.tempSiblingsWidth = [];
                // Call cellResize dashboard event.
                if (cellResize) {
                    fireEvent(this.editMode.board, 'cellResize', {
                        cell: cellResize
                    });
                    fireEvent(cellResize.row, 'cellChange', {
                        cell: cellResize,
                        row: cellResize.row
                    });
                }
            }
            /**
             * Add mouse events to snaps
             *
             */
            addResizeEvents() {
                const resizer = this;
                let mouseDownSnapX, mouseDownSnapY, mouseMoveSnap, mouseUpSnap;
                resizer.mouseDownSnapX = mouseDownSnapX = function (e) {
                    resizer.isActive = true;
                    resizer.currentDimension = 'x';
                    resizer.editMode.hideToolbars(['row', 'cell']);
                    resizer.setTempWidthSiblings();
                    resizer.startX = e.clientX;
                };
                resizer.mouseDownSnapY = mouseDownSnapY = function () {
                    resizer.isActive = true;
                    resizer.currentDimension = 'y';
                    resizer.editMode.hideToolbars(['row', 'cell']);
                };
                resizer.mouseMoveSnap = mouseMoveSnap = function (e) {
                    if (resizer.isActive) {
                        resizer.onMouseMove(e);
                    }
                };
                resizer.mouseUpSnap = mouseUpSnap = function () {
                    if (resizer.isActive) {
                        resizer.isActive = false;
                        resizer.currentDimension = void 0;
                        resizer.revertSiblingsAutoWidth();
                        resizer.editMode.showToolbars(['row', 'cell'], resizer.currentCell);
                        if (resizer.currentCell) {
                            resizer.setSnapPositions(resizer.currentCell);
                        }
                    }
                };
                // Add mouse events
                addEvent(this.snapRight, 'mousedown', mouseDownSnapX);
                addEvent(this.snapBottom, 'mousedown', mouseDownSnapY);
                addEvent(document, 'mousemove', mouseMoveSnap);
                addEvent(document, 'mouseup', mouseUpSnap);
                // Touch events
                // addEvent(snapX, 'touchstart', mouseDownSnapX);
                // addEvent(snapY, 'touchstart', mouseDownSnapY);
                // if (!rowContainer.hcEvents.mousemove) {
                //     addEvent(rowContainer, 'touchmove', mouseMoveSnap);
                //     addEvent(rowContainer, 'touchend', mouseUpSnap);
                // }
                const runReflow = () => {
                    if (resizer.currentCell) {
                        resizer.setSnapPositions(resizer.currentCell);
                    }
                };
                if (typeof ResizeObserver === 'function') {
                    this.resizeObserver = new ResizeObserver(runReflow);
                    this.resizeObserver.observe(resizer.editMode.board.container);
                }
                else {
                    const unbind = addEvent(window, 'resize', runReflow);
                    addEvent(this, 'destroy', unbind);
                }
            }
            /**
             * General method used on resizing.
             *
             * @param {global.Event} e
             * A mouse event.
             *
             */
            onMouseMove(e) {
                const currentCell = this.currentCell;
                const cellContainer = currentCell && currentCell.container;
                const currentDimension = this.currentDimension;
                if (currentCell &&
                    cellContainer &&
                    !((currentCell.row.layout.board.editMode || {}).dragDrop || {})
                        .isActive) {
                    const cellOffsets = GUIElement.getOffsets(currentCell);
                    const { width: parentRowWidth } = GUIElement.getDimFromOffsets(GUIElement.getOffsets(currentCell.row));
                    // Resize width
                    if (currentDimension === 'x') {
                        const newWidth = (Math.min(e.clientX - cellOffsets.left, parentRowWidth) /
                            parentRowWidth) *
                            100 +
                            '%';
                        currentCell.setSize(newWidth);
                        this.startX = e.clientX;
                    }
                    // Resize height
                    if (currentDimension === 'y') {
                        currentCell.setSize(void 0, e.clientY - cellOffsets.top);
                    }
                    // Call cellResize dashboard event.
                    fireEvent(this.editMode.board, 'cellResize', {
                        cell: currentCell
                    });
                    fireEvent(currentCell.row, 'cellChange', {
                        cell: currentCell,
                        row: currentCell.row
                    });
                    this.setSnapPositions(currentCell);
                }
            }
            /**
             * Destroy resizer
             */
            destroy() {
                const snaps = ['snapRight', 'snapBottom'];
                let snap;
                // Unbind events
                removeEvent(document, 'mousemove');
                removeEvent(document, 'mouseup');
                this.resizeObserver?.unobserve(this.editMode.board.container);
                for (let i = 0, iEnd = snaps.length; i < iEnd; ++i) {
                    snap = this[snaps[i]];
                    // Unbind event
                    removeEvent(snap, 'mousedown');
                    // Destroy snap
                    snap.remove();
                }
            }
            /**
             * Converts the class instance to a class JSON.
             * @internal
             *
             * @return {Resizer.JSON}
             * Class JSON of this Resizer instance.
             */
            toJSON() {
                const options = this.options;
                return {
                    $class: 'Dashboards.Action.Resizer',
                    options: {
                        enabled: options.enabled,
                        styles: {
                            minWidth: options.styles.minWidth,
                            minHeight: options.styles.minHeight
                        },
                        type: options.type,
                        snap: {
                            width: options.snap.width,
                            height: options.snap.height
                        }
                    }
                };
            }
        }
        Resizer.defaultOptions = {
            enabled: true,
            styles: {
                minWidth: 20,
                minHeight: 50
            },
            type: 'xy',
            snap: {
                width: 9,
                height: 17
            }
        };

        return Resizer;
    });
    _registerModule(_modules, 'Dashboards/EditMode/ConfirmationPopup.js', [_modules['Core/Utilities.js'], _modules['Shared/BaseForm.js'], _modules['Dashboards/EditMode/EditGlobals.js'], _modules['Dashboards/EditMode/EditRenderer.js']], function (U, BaseForm, EditGlobals, EditRenderer) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { createElement } = U;
        /**
         * Class to create confirmation popup.
         */
        class ConfirmationPopup extends BaseForm {
            /* *
            *
            *  Static Properties
            *
            * */
            /* *
            *
            *  Constructor
            *
            * */
            /**
             * Constructs an instance of the ConfirmationPopup.
             *
             * @param parentDiv
             * Parent div where the popup will be added.
             *
             * @param iconsURL
             * URL to the icons.
             *
             * @param editMode
             * The EditMode instance.
             *
             * @param options
             * Options for confirmation popup.
             */
            constructor(parentDiv, iconsURL, editMode, options) {
                iconsURL =
                    options && options.close && options.close.icon ?
                        options.close.icon :
                        iconsURL;
                super(parentDiv, iconsURL);
                this.editMode = editMode;
                this.options = options;
            }
            /* *
            *
            *  Functions
            *
            * */
            /**
             * Returns popup container.
             *
             * @param parentDiv
             * Parent div where the popup will be added.
             *
             * @param className
             * Class name added to the popup container.
             */
            createPopupContainer(parentDiv, className = EditGlobals.classNames.confirmationPopup) {
                return super.createPopupContainer(parentDiv, className);
            }
            /**
             * Adds close button to the popup.
             *
             * @param className
             * Class name added to the close button.
             */
            addCloseButton(className = EditGlobals.classNames.popupCloseButton) {
                return super.addCloseButton(className);
            }
            /**
             * Adds content inside the popup.
             *
             * @param options
             * Options for confirmation popup.
             */
            renderContent(options) {
                // Render content wrapper
                this.contentContainer = createElement('div', {
                    className: EditGlobals.classNames.popupContentContainer
                }, {}, this.container);
                const popupContainer = this.contentContainer.parentNode;
                popupContainer.style.marginTop = '0px';
                const offsetTop = popupContainer.getBoundingClientRect().top;
                popupContainer.style.marginTop = (offsetTop < 0 ? Math.abs(offsetTop - 200) : 200) + 'px';
                // Render text
                EditRenderer.renderText(this.contentContainer, {
                    title: options.text || ''
                });
                // Render button wrapper
                this.buttonContainer = createElement('div', {
                    className: EditGlobals.classNames.popupButtonContainer
                }, {}, this.container);
                // Render cancel buttons
                EditRenderer.renderButton(this.buttonContainer, {
                    text: options.cancelButton.value,
                    className: EditGlobals.classNames.popupCancelBtn,
                    callback: options.cancelButton.callback
                });
                // Confirm
                EditRenderer.renderButton(this.buttonContainer, {
                    text: options.confirmButton.value,
                    className: EditGlobals.classNames.popupConfirmBtn,
                    callback: () => {
                        // Run callback
                        // confirmCallback.call(context);
                        options.confirmButton.callback.call(options.confirmButton.context);
                        // Hide popup
                        this.closePopup();
                    }
                });
            }
            /**
             * Shows confirmation popup.
             *
             * @param options
             * Options for confirmation popup.
             */
            show(options) {
                this.showPopup();
                this.renderContent(options);
                this.editMode.setEditOverlay();
            }
            /**
             * Hides confirmation popup.
             */
            closePopup() {
                super.closePopup();
                this.editMode.setEditOverlay(true);
            }
        }

        return ConfirmationPopup;
    });
    _registerModule(_modules, 'Dashboards/EditMode/EditMode.js', [_modules['Dashboards/EditMode/EditGlobals.js'], _modules['Dashboards/EditMode/EditRenderer.js'], _modules['Dashboards/EditMode/Toolbar/CellEditToolbar.js'], _modules['Dashboards/EditMode/Toolbar/RowEditToolbar.js'], _modules['Dashboards/EditMode/SidebarPopup.js'], _modules['Dashboards/EditMode/EditContextMenu.js'], _modules['Dashboards/Actions/DragDrop.js'], _modules['Dashboards/Actions/Resizer.js'], _modules['Dashboards/EditMode/ConfirmationPopup.js'], _modules['Dashboards/Actions/ContextDetection.js'], _modules['Dashboards/Layout/GUIElement.js'], _modules['Core/Utilities.js']], function (EditGlobals, EditRenderer, CellEditToolbar, RowEditToolbar, SidebarPopup, EditContextMenu, DragDrop, Resizer, ConfirmationPopup, ContextDetection, GUIElement, U) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { addEvent, createElement, css, merge } = U;
        /* *
         *
         *  Class
         *
         * */
        class EditMode {
            /* *
            *
            *  Constructor
            *
            * */
            /**
             * Edit mode constructor.
             * @internal
              *
             * @param board
             * Board instance
             *
             * @param options
             * Edit mode options
             */
            constructor(board, options) {
                /* *
                *
                *  Properties
                *
                * */
                /**
                 * @internal
                 */
                this.active = false;
                /**
                 * URL from which the icons will be fetched.
                 */
                this.iconsURLPrefix = 'https://code.highcharts.com/dashboards/2.0.0/gfx/dashboards-icons/';
                this.iconsURLPrefix =
                    (options && options.iconsURLPrefix) || this.iconsURLPrefix;
                this.options = merge(
                // Default options.
                {
                    confirmationPopup: {
                        close: {
                            icon: this.iconsURLPrefix + 'close.svg'
                        }
                    },
                    contextMenu: {
                        icon: this.iconsURLPrefix + 'menu.svg'
                    },
                    dragDrop: {
                        enabled: true
                    },
                    enabled: true,
                    resize: {
                        enabled: true
                    },
                    settings: {
                        enabled: true
                    },
                    toolbars: {
                        cell: {
                            enabled: true
                        },
                        row: {
                            enabled: true
                        }
                    },
                    tools: {
                        addComponentBtn: {
                            enabled: true,
                            icon: this.iconsURLPrefix + 'add.svg'
                        }
                    }
                }, options || {});
                this.board = board;
                this.lang = merge({}, EditGlobals.lang, this.options.lang);
                this.contextPointer = {
                    isVisible: false,
                    element: createElement('div', { className: EditGlobals.classNames.contextDetectionPointer }, {}, this.board.container)
                };
                this.isInitialized = false;
                this.isContextDetectionActive = false;
                this.tools = {};
                this.createTools();
                this.confirmationPopup = new ConfirmationPopup(board.container, this.iconsURLPrefix, this, this.options.confirmationPopup);
                // Create edit overlay.
                this.editOverlay = createElement('div', {
                    className: EditGlobals.classNames.editOverlay
                }, {}, board.container);
                this.isEditOverlayActive = false;
            }
            /* *
            *
            *  Functions
            *
            * */
            /**
             * Event to fire on click of the context button.
             * @internal
             */
            onContextBtnClick() {
                const editMode = this;
                // Toggle context menu visibility.
                if (editMode.tools.contextMenu) {
                    if (!editMode.tools.contextMenu.isVisible) {
                        editMode.tools.contextMenu
                            .updatePosition(editMode.tools.contextButtonElement);
                    }
                    editMode.tools.contextMenu.setVisible(!editMode.tools.contextMenu.isVisible);
                }
            }
            /**
             * Activate or deactivate edit mode.
             */
            onEditModeToggle() {
                const editMode = this;
                if (editMode.active) {
                    editMode.deactivate();
                }
                else {
                    editMode.activate();
                }
            }
            /**
             * Init the instance of edit mode.
             * @internal
             */
            init() {
                const editMode = this;
                if (this.options.resize?.enabled) {
                    editMode.resizer = new Resizer(editMode, editMode.options.resize);
                }
                editMode.dragDrop = new DragDrop(editMode, editMode.options.dragDrop);
                // Init rowToolbar.
                if (editMode.options.toolbars?.row?.enabled && !editMode.rowToolbar) {
                    editMode.rowToolbar = new RowEditToolbar(editMode);
                }
                // Init cellToolbar.
                if (editMode.options.toolbars?.cell?.enabled && !editMode.cellToolbar) {
                    editMode.cellToolbar = new CellEditToolbar(editMode);
                }
                // Init Sidebar.
                if (!editMode.sidebar) {
                    editMode.sidebar = new SidebarPopup(this.board.container, this.iconsURLPrefix, editMode);
                }
                editMode.isInitialized = true;
            }
            /**
             * Init events for edit mode.
             * @internal
             */
            initEvents() {
                const editMode = this, board = editMode.board;
                for (let i = 0, iEnd = board.layouts.length; i < iEnd; ++i) {
                    editMode.setLayoutEvents(board.layouts[i]);
                }
                if (editMode.cellToolbar) {
                    // Stop context detection when mouse on cell toolbar.
                    addEvent(editMode.cellToolbar.container, 'mouseenter', function () {
                        editMode.stopContextDetection();
                    });
                    addEvent(editMode.cellToolbar.container, 'mouseleave', function () {
                        editMode.isContextDetectionActive = true;
                    });
                }
                if (editMode.rowToolbar) {
                    // Stop context detection when mouse on row toolbar.
                    addEvent(editMode.rowToolbar.container, 'mouseenter', function () {
                        editMode.stopContextDetection();
                    });
                    addEvent(editMode.rowToolbar.container, 'mouseleave', function () {
                        editMode.isContextDetectionActive = true;
                    });
                }
                if (board.layoutsWrapper) {
                    addEvent(board.layoutsWrapper, 'mousemove', editMode.onDetectContext.bind(editMode));
                    addEvent(board.layoutsWrapper, 'click', editMode.onContextConfirm.bind(editMode));
                    addEvent(board.layoutsWrapper, 'mouseleave', () => {
                        editMode.hideContextPointer();
                    });
                }
            }
            /**
             * Set events for the layout.
             * @internal
             */
            setLayoutEvents(layout) {
                const editMode = this;
                for (let j = 0, jEnd = layout.rows.length; j < jEnd; ++j) {
                    const row = layout.rows[j];
                    editMode.setRowEvents(row);
                    for (let k = 0, kEnd = row.cells.length; k < kEnd; ++k) {
                        editMode.setCellEvents(row.cells[k]);
                    }
                }
            }
            /**
             * Set events for the row.
             * @internal
             */
            setRowEvents(row) {
                const editMode = this;
                // Init dragDrop row events.
                if (editMode.dragDrop) {
                    const dragDrop = editMode.dragDrop;
                    addEvent(row.container, 'mouseenter', function () {
                        if (editMode.isContextDetectionActive) {
                            editMode.mouseRowContext = row;
                        }
                    });
                    addEvent(row.container, 'mousemove', function (e) {
                        if (dragDrop.isActive && e.target === row.container) {
                            dragDrop.mouseRowContext = row;
                        }
                    });
                    addEvent(row.container, 'mouseleave', function () {
                        if (dragDrop.isActive && dragDrop.mouseRowContext === row) {
                            dragDrop.mouseRowContext = void 0;
                        }
                        if (editMode.isContextDetectionActive) {
                            editMode.mouseRowContext = void 0;
                        }
                    });
                }
            }
            /**
             * Set events for the cell.
             * @internal
             */
            setCellEvents(cell) {
                const editMode = this;
                if (cell.nestedLayout) {
                    editMode.setLayoutEvents(cell.nestedLayout);
                }
                else if (editMode.cellToolbar && cell.container) {
                    // Init dragDrop cell events.
                    if (editMode.dragDrop || editMode.resizer) {
                        const dragDrop = editMode.dragDrop;
                        addEvent(cell.container, 'mouseenter', function () {
                            if (editMode.isContextDetectionActive) {
                                editMode.mouseCellContext = cell;
                            }
                        });
                        addEvent(cell.container, 'mousemove', function (e) {
                            if (dragDrop &&
                                dragDrop.isActive &&
                                e.target === cell.container) {
                                dragDrop.mouseCellContext = cell;
                                dragDrop.mouseRowContext = void 0;
                            }
                        });
                        addEvent(cell.container, 'mouseleave', function () {
                            if (dragDrop &&
                                dragDrop.isActive &&
                                dragDrop.mouseCellContext === cell) {
                                dragDrop.mouseCellContext = void 0;
                            }
                            if (editMode.isContextDetectionActive) {
                                editMode.mouseCellContext = void 0;
                            }
                        });
                    }
                }
            }
            /**
             * Activate the edit mode.
             * @internal
             */
            activate() {
                const editMode = this;
                // Init edit mode.
                if (!editMode.isInitialized) {
                    editMode.init();
                    editMode.initEvents();
                }
                // Set edit mode active class to dashboard.
                editMode.board.container.classList.add(EditGlobals.classNames.editModeEnabled);
                // TODO all buttons should be activated, add some wrapper?
                if (this.addComponentBtn) {
                    this.addComponentBtn.style.display = 'block';
                }
                editMode.active = true;
                editMode.isContextDetectionActive = true;
            }
            /**
             * Deactivate the edit mode.
             * @internal
             */
            deactivate() {
                const editMode = this, dashboardCnt = editMode.board.container;
                dashboardCnt.classList.remove(EditGlobals.classNames.editModeEnabled);
                // Hide toolbars.
                editMode.hideToolbars();
                // Remove highlight from the context row if exists.
                if (this.editCellContext) {
                    this.editCellContext.row?.setHighlight(true);
                }
                // TODO all buttons should be deactivated.
                if (this.addComponentBtn) {
                    this.addComponentBtn.style.display = 'none';
                }
                if (editMode.resizer) {
                    editMode.resizer.disableResizer();
                }
                // Disable responsive width and restore elements to their original
                // positions and sizes.
                if (this.board.layoutsWrapper) {
                    this.board.layoutsWrapper.style.width = '100%';
                }
                this.board.reflow();
                editMode.active = false;
                editMode.stopContextDetection();
                this.editCellContext = void 0;
                this.potentialCellContext = void 0;
            }
            /**
             * Function to check whether the edit mode is activated.
             * @internal
             *
             * @returns
             * Whether the edit mode is activated.
             */
            isActive() {
                return this.active;
            }
            /**
             * Method for hiding edit toolbars.
             * @internal
             *
             * @param toolbarTypes
             * The array of toolbar names to hide ('cell', 'row', 'sidebar').
             */
            hideToolbars(toolbarTypes) {
                const editMode = this, toolbarsToHide = toolbarTypes || ['cell', 'row', 'sidebar'];
                for (let i = 0, iEnd = toolbarsToHide.length; i < iEnd; ++i) {
                    switch (toolbarsToHide[i]) {
                        case 'cell': {
                            if (editMode.cellToolbar &&
                                editMode.cellToolbar.isVisible) {
                                editMode.cellToolbar.hide();
                            }
                            break;
                        }
                        case 'row': {
                            if (editMode.rowToolbar && editMode.rowToolbar.isVisible) {
                                editMode.rowToolbar.hide();
                            }
                            break;
                        }
                        case 'sidebar': {
                            if (editMode.sidebar && editMode.sidebar.isVisible) {
                                editMode.sidebar.hide();
                            }
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                }
            }
            /**
             * Method for hiding edit toolbars.
             * @internal
             *
             * @param toolbarTypes
             * The array of toolbar names to hide ('cell', 'row', 'sidebar').
             *
             * @param currentCell
             * The cell reference for toolbar.
             *
             */
            showToolbars(toolbarTypes, currentCell) {
                const editMode = this, toolbarsToShow = toolbarTypes || ['cell', 'row', 'sidebar'];
                for (let i = 0, iEnd = toolbarsToShow.length; i < iEnd; ++i) {
                    switch (toolbarsToShow[i]) {
                        case 'cell': {
                            if (currentCell && editMode.cellToolbar) {
                                editMode.cellToolbar.isVisible = true;
                                editMode.cellToolbar.showToolbar(currentCell);
                            }
                            break;
                        }
                        case 'row': {
                            if (currentCell && currentCell.row && editMode.rowToolbar) {
                                editMode.rowToolbar.isVisible = true;
                                editMode.rowToolbar.showToolbar(currentCell.row);
                            }
                            break;
                        }
                        case 'sidebar': {
                            if (editMode.sidebar && !editMode.sidebar.isVisible) {
                                editMode.sidebar.show();
                            }
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                }
            }
            /**
             * Creates the buttons such as `addComponent` button, context menu button
             * and its container.
             * @internal
             */
            createTools() {
                const editMode = this;
                const options = this.options;
                // Create tools container
                this.tools.container = document.createElement('div');
                this.tools.container.classList.add(EditGlobals.classNames.editTools);
                this.board.layoutsWrapper?.parentNode.insertBefore(this.tools.container, this.board.layoutsWrapper);
                // Create context menu button
                if (options.contextMenu && options.contextMenu.enabled) {
                    this.tools.contextButtonElement = EditRenderer.renderContextButton(this.tools.container, editMode);
                    // Init contextMenu if doesn't exist.
                    if (!editMode.tools.contextMenu) {
                        editMode.tools.contextMenu = new EditContextMenu(editMode.board.container, editMode.options.contextMenu || {}, editMode);
                    }
                }
                // Create add component button
                if (options.tools?.addComponentBtn?.enabled &&
                    options.toolbars?.cell?.enabled) {
                    const addIconURL = options.tools.addComponentBtn.icon;
                    this.addComponentBtn = EditRenderer.renderButton(this.tools.container, {
                        className: EditGlobals.classNames.editToolsBtn,
                        icon: addIconURL,
                        text: this.lang.addComponent,
                        callback: () => {
                            // Sidebar trigger
                            if (editMode.sidebar) {
                                editMode.sidebar.show();
                                editMode.setEditOverlay();
                            }
                        },
                        style: {
                            display: 'none'
                        }
                    });
                }
            }
            /**
             * Event fired when detecting context on drag&drop.
             *
             * @param e
             * Mouse pointer event.
             */
            onDetectContext(e) {
                const editMode = this, offset = 50; // TODO - add it from options.
                if (editMode.isActive() &&
                    editMode.isContextDetectionActive &&
                    (editMode.mouseCellContext || editMode.mouseRowContext) &&
                    !(editMode.dragDrop || {}).isActive) {
                    let cellContext, rowContext;
                    if (editMode.mouseCellContext) {
                        cellContext = ContextDetection
                            .getContext(editMode.mouseCellContext, e, offset).cell;
                    }
                    else if (editMode.mouseRowContext) {
                        rowContext = editMode.mouseRowContext;
                        cellContext = rowContext.layout.parentCell;
                    }
                    this.potentialCellContext = cellContext;
                    if (cellContext) {
                        const cellContextOffsets = GUIElement
                            .getOffsets(cellContext, editMode.board.container);
                        const { width, height } = GUIElement
                            .getDimFromOffsets(cellContextOffsets);
                        editMode.showContextPointer(cellContextOffsets.left, cellContextOffsets.top, width, height);
                    }
                }
            }
            /**
             * Stops the context detection.
             */
            stopContextDetection() {
                this.isContextDetectionActive = false;
                if (this.dragDrop) {
                    this.dragDrop.mouseCellContext = void 0;
                }
                this.mouseCellContext = void 0;
                this.hideContextPointer();
            }
            /**
             * Confirms the selected context.
             */
            onContextConfirm() {
                if (this.isContextDetectionActive &&
                    this.potentialCellContext &&
                    this.editCellContext !== this.potentialCellContext) {
                    this.setEditCellContext(this.potentialCellContext, this.editCellContext);
                }
            }
            /**
             * Sets the edit cell context.
             * @internal
             */
            setEditCellContext(editCellContext, oldEditCellContext) {
                const editMode = this, oldContextRow = oldEditCellContext && oldEditCellContext.row;
                editMode.editCellContext = editCellContext;
                editMode.showToolbars(['row', 'cell'], editCellContext);
                if (!oldContextRow || oldContextRow !== editCellContext.row) {
                    if (oldContextRow) {
                        // Remove highlight from the previous row.
                        oldContextRow.setHighlight(true);
                    }
                    // Add highlight to the context row.
                    editCellContext.row.setHighlight();
                }
                if (editMode.resizer) {
                    editMode.resizer.setSnapPositions(editCellContext);
                }
            }
            /**
             * Method for showing and positioning context pointer.
             * @internal
             */
            showContextPointer(left, top, width, height) {
                this.contextPointer.isVisible = true;
                css(this.contextPointer.element, {
                    display: 'block',
                    left: left + 'px',
                    top: top + 'px',
                    height: height + 'px',
                    width: width + 'px'
                });
            }
            /**
             * Method for hiding context pointer.
             * @internal
             */
            hideContextPointer() {
                if (this.contextPointer.isVisible) {
                    this.contextPointer.isVisible = false;
                    this.contextPointer.element.style.display = 'none';
                }
            }
            /**
             * Adds/Removes the edit mode overlay.
             * @internal
             *
             * @param remove
             * Whether the edit overlay should be removed.
             */
            setEditOverlay(remove) {
                const editMode = this, cnt = editMode.editOverlay, isSet = cnt.classList.contains(EditGlobals.classNames.editOverlayActive);
                if (!remove && !isSet) {
                    cnt.classList.add(EditGlobals.classNames.editOverlayActive);
                    editMode.isEditOverlayActive = true;
                }
                else if (remove && isSet) {
                    cnt.classList.remove(EditGlobals.classNames.editOverlayActive);
                    editMode.isEditOverlayActive = false;
                }
            }
        }
        /* *
         *
         *  Default Export
         *
         * */

        return EditMode;
    });
    _registerModule(_modules, 'Dashboards/EditMode/Fullscreen.js', [_modules['Core/Utilities.js'], _modules['Dashboards/Globals.js']], function (U, Globals) {
        /* *
         *
         *  (c) 2009-2024 Highsoft AS
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         *  Authors:
         *  - Sebastian Bochan
         *  - Wojciech Chmiel
         *  - Gøran Slettemark
         *  - Sophie Bremer
         *
         * */
        const { addEvent } = U;
        class Fullscreen {
            /* *
            *
            *  Constructor
            *
            * */
            constructor(DashboardClass) {
                this.isOpen = false;
                this.board = DashboardClass;
                // Add class to allow scroll element
                this.board.boardWrapper.classList.add(Globals.classNamePrefix + '-fullscreen');
            }
            /* *
            *
            *  Functions
            *
            * */
            /**
             * Toggles displaying the board in fullscreen mode.
             */
            toggle() {
                const fullscreen = this, isOpen = this.isOpen;
                fullscreen[isOpen ? 'close' : 'open']();
            }
            /**
             * Display board in fullscreen.
             */
            open() {
                if (this.isOpen) {
                    return;
                }
                const fullscreen = this, board = fullscreen.board;
                // Handle exitFullscreen() method when user clicks 'Escape' button.
                const unbindChange = addEvent(board.boardWrapper.ownerDocument, // Dashboard's document
                'fullscreenchange', function () {
                    if (fullscreen.isOpen) {
                        fullscreen.isOpen = false;
                        fullscreen.close();
                    }
                    else {
                        fullscreen.isOpen = true;
                        fullscreen.setButtonText();
                    }
                });
                fullscreen.unbindFullscreenEvent = () => {
                    unbindChange();
                };
                const promise = board.boardWrapper.requestFullscreen();
                // eslint-disable-next-line highcharts/quote-members
                promise.catch(() => {
                    throw new Error('Full screen is not supported.');
                });
            }
            /**
             * Stops displaying the dashboard in fullscreen mode.
             */
            close() {
                const fullscreen = this, board = fullscreen.board;
                // Don't fire exitFullscreen() when user exited using 'Escape' button.
                if (fullscreen.isOpen &&
                    board.boardWrapper.ownerDocument instanceof Document) {
                    void board.boardWrapper.ownerDocument.exitFullscreen();
                }
                // Unbind event as it's necessary only before exiting from fullscreen.
                if (fullscreen.unbindFullscreenEvent) {
                    fullscreen.unbindFullscreenEvent =
                        fullscreen.unbindFullscreenEvent();
                }
                fullscreen.isOpen = false;
                this.setButtonText();
            }
            /**
             * Set the correct text depending of the fullscreen is on or of.
             */
            setButtonText() {
                const editMode = this.board.editMode, contextMenu = editMode && editMode.tools.contextMenu, button = contextMenu && contextMenu.items.viewFullscreen;
                if (button && button.innerElement) {
                    const lang = editMode.lang;
                    button.innerElement.innerHTML =
                        (this.isOpen ? lang.exitFullscreen : lang.viewFullscreen) || '';
                }
            }
        }

        return Fullscreen;
    });
    _registerModule(_modules, 'masters/modules/layout.src.js', [_modules['Dashboards/Globals.js'], _modules['Dashboards/EditMode/EditMode.js'], _modules['Dashboards/EditMode/Fullscreen.js']], function (Globals, EditMode, Fullscreen) {

        /* *
         *
         *  Imports
         *
         * */
        // Fill registries
        /* *
         *
         *  Namespace
         *
         * */
        const G = Globals;
        G.EditMode = EditMode;
        G.FullScreen = Fullscreen;
        /* *
         *
         *  Default Export
         *
         * */

        return G;
    });
}));