"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
class CustomCommand extends core_1.Command {
    toSuccessJson(result) {
        return { status: 'success', ...result };
    }
    toErrorJson(error) {
        const result = {
            status: 'error',
            message: error.message,
            code: error.code,
            sugestions: error.suggestions,
        };
        return result;
    }
}
exports.default = CustomCommand;
CustomCommand.enableJsonFlag = true;
CustomCommand.args = [{ name: 'dir', description: 'Capacitor project root directory', required: false, default: './' }];
CustomCommand.flags = {
    version: core_1.Flags.string({ char: 'v', description: 'Set specific version', helpValue: 'x.x.x', required: true }),
    build: core_1.Flags.integer({ char: 'b', description: 'Set specific build', helpValue: '10', required: true }),
    iosproject: core_1.Flags.string({ description: 'Set specific build', helpValue: 'App/App.xcodeproj/project.pbxproj', required: true, default: 'App/App.xcodeproj/project.pbxproj' }),
    iosplist: core_1.Flags.string({ description: 'Set specific build', helpValue: 'App/App/Info.plist', required: true, default: 'App/App/Info.plist' }),
};
