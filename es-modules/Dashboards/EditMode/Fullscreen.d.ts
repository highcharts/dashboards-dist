import Board from '../Board.js';
declare class Fullscreen {
    constructor(DashboardClass: Board);
    board: Board;
    isOpen: boolean;
    private unbindFullscreenEvent?;
    /**
     * Toggles displaying the board in fullscreen mode.
     *
     * @param container
     * The container to be displayed in fullscreen mode.
     */
    toggle(container?: HTMLElement): void;
    /**
     * Display board in fullscreen.
     */
    open(container?: HTMLElement): void;
    /**
     * Stops displaying the dashboard in fullscreen mode.
     */
    close(): void;
    /**
     * Set the correct text depending of the fullscreen is on or of.
     */
    setButtonText(): void;
}
export default Fullscreen;
