import { Command } from '@oclif/core';
import CustomError from './custom-error';
import JsonError from './json-error';
import JsonResult from './json-result';
export default abstract class CustomCommand extends Command {
    static enableJsonFlag: boolean;
    static args: {
        name: string;
        description: string;
        required: boolean;
        default: string;
    }[];
    static flags: {
        version: import("@oclif/core/lib/interfaces").OptionFlag<string>;
        build: import("@oclif/core/lib/interfaces").OptionFlag<number>;
        iosproject: import("@oclif/core/lib/interfaces").OptionFlag<string>;
        iosplist: import("@oclif/core/lib/interfaces").OptionFlag<string>;
    };
    protected toSuccessJson(result: object): JsonResult;
    protected toErrorJson(error: CustomError): JsonError;
}
