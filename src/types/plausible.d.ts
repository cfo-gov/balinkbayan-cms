/**
 * Plausible Analytics type definitions
 */

interface PlausibleOptions {
  callback?: () => void;
  props?: Record<string, string | number | boolean>;
}

/**
 * Plausible Analytics tracking function
 * @param eventName - The name of the event to track
 * @param options - Optional parameters (callback function or custom event properties)
 */
declare function plausible(eventName: string, options?: PlausibleOptions | (() => void)): void;

declare global {
  /**
   * Plausible Analytics tracking function
   */
  function plausible(eventName: string, options?: PlausibleOptions | (() => void)): void;

  /**
   * Augment the Window interface to include the plausible tracking function
   */
  interface Window {
    /**
     * Plausible Analytics tracking function
     */
    plausible: typeof plausible & {
      /**
       * Queue for tracking events when the script hasn't loaded yet
       */
      q?: Array<Parameters<typeof plausible>>;
    };
  }
}