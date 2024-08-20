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
'use strict';
import EditRenderer from './EditRenderer.js';
import U from '../../Core/Utilities.js';
import EditGlobals from './EditGlobals.js';
import ConfirmationPopup from './ConfirmationPopup.js';
const { createElement, merge, error, fireEvent } = U;
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
        this.oldOptionsBuffer = {};
        this.waitingForConfirmation = false;
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
     *
     * @param component
     * The component to render the menu for.
     */
    renderContent(container, component) {
        const { editMode } = component.board;
        const menu = this;
        const editableOptions = component.editableOptions.getOptions();
        let options;
        let content;
        this.component = component;
        this.oldOptionsBuffer = merge({}, component.options);
        if (editMode) {
            this.confirmationPopup = new ConfirmationPopup(component.board.container, editMode.iconsURLPrefix, editMode, { close: { icon: '' } });
        }
        const accordionContainer = createElement('div', {
            className: EditGlobals.classNames.accordionMenu
        }, {}, container);
        for (let i = 0, end = editableOptions.length; i < end; i++) {
            options = editableOptions[i];
            content = EditRenderer.renderCollapseHeader(accordionContainer, merge({
                iconsURLPrefix: menu.iconsURLPrefix,
                lang: (component.board?.editMode || EditGlobals).lang
            }, options)).content;
            this.renderAccordion(options, content, component);
        }
        const buttonContainer = createElement('div', {
            className: EditGlobals.classNames.accordionMenuButtonsContainer
        }, {}, accordionContainer);
        EditRenderer.renderButton(buttonContainer, {
            text: (component.board?.editMode || EditGlobals)
                .lang.confirmButton,
            className: EditGlobals.classNames.popupConfirmBtn,
            callback: async () => {
                await this.confirmChanges();
            }
        });
        EditRenderer.renderButton(buttonContainer, {
            text: (component.board?.editMode || EditGlobals)
                .lang.cancelButton,
            className: EditGlobals.classNames.popupCancelBtn,
            callback: () => {
                this.cancelChanges();
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
     *
     * @param value
     * New value of the property.
     */
    updateOptions(propertyPath, value) {
        const pathLength = propertyPath.length - 1;
        let currentLevel = this.changedOptions;
        let currentChartOptionsLevel;
        let currentOldChartOptionsBufferLevel;
        if (pathLength === 0 && propertyPath[0] === 'chartOptions') {
            try {
                const parsedValue = JSON.parse(value);
                this.chartOptionsJSON = parsedValue;
            }
            catch (e) {
                // TODO: Handle the wrong config passed from the user.
                error(`Dashboards Error: Wrong JSON config structure passed as a chart options. \n____________\n${e}`);
            }
        }
        for (let i = 0; i < pathLength; i++) {
            const key = propertyPath[i];
            if (!currentLevel[key]) {
                currentLevel[key] = {};
            }
            currentLevel = currentLevel[key];
            if (key === 'chartOptions') {
                const realChartOptions = this.component.chart?.options;
                if (realChartOptions) {
                    const oldOptionsBuffer = this.oldOptionsBuffer;
                    if (!oldOptionsBuffer.chartOptions) {
                        oldOptionsBuffer.chartOptions = {};
                    }
                    currentOldChartOptionsBufferLevel =
                        oldOptionsBuffer.chartOptions;
                    currentChartOptionsLevel = realChartOptions;
                }
            }
            else if (currentChartOptionsLevel &&
                currentOldChartOptionsBufferLevel) {
                currentChartOptionsLevel = currentChartOptionsLevel[key];
                if (currentOldChartOptionsBufferLevel[key] === void 0) {
                    currentOldChartOptionsBufferLevel[key] = {};
                }
                currentOldChartOptionsBufferLevel =
                    currentOldChartOptionsBufferLevel[key];
            }
        }
        const lastKey = propertyPath[pathLength];
        currentLevel[lastKey] = value;
        if (currentOldChartOptionsBufferLevel && currentChartOptionsLevel) {
            currentOldChartOptionsBufferLevel[lastKey] = (currentOldChartOptionsBufferLevel[lastKey] ??
                currentChartOptionsLevel[lastKey]);
        }
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.component?.update(this.changedOptions);
    }
    /**
     * Renders either a basic or nested element. This function can be
     * recursively called, if there are multiple nested options.
     *
     * @param options
     * Configuration object of the Component options.
     *
     * @param parentNode
     * A container where the accordion is rendered.
     *
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
     *
     * @param options
     * configuration object for the options
     *
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
    /**
     * Closes the sidebar discarding changes. If there are any changes, it will
     * show a confirmation popup. If no changes, it will close the sidebar.
     */
    cancelChanges() {
        if (Object.keys(this.changedOptions).length < 1) {
            this.closeSidebar();
        }
        else {
            this.showCancelConfirmationPopup();
        }
    }
    /**
     * Confirms changes made in the component.
     *
     * @fires EditMode#componentChanged
     */
    async confirmChanges() {
        const component = this.component;
        if (!component) {
            return;
        }
        if (component.type === 'Highcharts' &&
            Object.keys(this.chartOptionsJSON).length) {
            await component.update({
                chartOptions: this.chartOptionsJSON
            });
        }
        else if (component.type === 'HTML') {
            const options = this.changedOptions;
            await component.update(options, true);
        }
        fireEvent(component.board.editMode, 'componentChanged', {
            target: component,
            changedOptions: merge({}, this.changedOptions),
            oldOptions: merge({}, this.oldOptionsBuffer)
        });
        this.changedOptions = {};
        this.chartOptionsJSON = {};
        this.closeSidebar();
    }
    /**
     * Discards changes made in the component.
     *
     * @fires EditMode#componentChangesDiscarded
     */
    async discardChanges() {
        const component = this.component;
        if (!component) {
            return;
        }
        await component.update(this.oldOptionsBuffer);
        fireEvent(component.board.editMode, 'componentChangesDiscarded', {
            target: component,
            changedOptions: merge({}, this.changedOptions),
            oldOptions: merge({}, this.oldOptionsBuffer)
        });
        this.changedOptions = {};
        this.chartOptionsJSON = {};
    }
    /**
     * Shows a confirmation popup when the user tries to discard changes.
     */
    showCancelConfirmationPopup() {
        const popup = this.confirmationPopup;
        const editMode = this.component?.board?.editMode;
        if (!popup || !editMode || this.waitingForConfirmation) {
            return;
        }
        this.waitingForConfirmation = true;
        popup.show({
            text: editMode.lang.confirmDiscardChanges,
            confirmButton: {
                value: editMode.lang.confirmButton,
                callback: async () => {
                    await this.discardChanges();
                    this.waitingForConfirmation = false;
                    this.closeSidebar();
                },
                context: this
            },
            cancelButton: {
                value: editMode.lang.cancelButton,
                callback: () => {
                    popup.closePopup();
                    editMode.setEditOverlay();
                    setTimeout(() => {
                        this.waitingForConfirmation = false;
                    }, 100);
                }
            }
        });
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default AccordionMenu;
