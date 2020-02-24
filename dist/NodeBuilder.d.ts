import { Plugin } from "./components/plugins/Plugin";
import webpack = require("webpack");
declare class NodeBuilder {
    private static InputFilename;
    private static OutputFilename;
    private static get FolderPath();
    /**
     * Returns the input page as a string (JS)
     */
    static PageString(plugins: Plugin[]): string;
    static WebpackConfig(): webpack.Configuration;
    static BuildPage(layout: {
        body: string;
        head: string;
    }, plugins: Plugin[]): Promise<string>;
    private static GetHTML;
    static CreateFile(name: string, data: any): Promise<void>;
    /**
     * Creates temporary folder for building process
     */
    static CreateFolder(): void;
    /**
     * Deletes folder once building is done
     */
    static DeleteFolder(folder?: string): void;
}
export { NodeBuilder };
