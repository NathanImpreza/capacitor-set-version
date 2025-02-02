"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_command_1 = require("../../common/custom-command");
const custom_error_1 = require("../../common/custom-error");
const utils_capacitor_1 = require("../../common/utils-capacitor");
const utils_ios_1 = require("../../common/utils-ios");
class SetIOS extends custom_command_1.default {
    async run() {
        const { args, flags } = await this.parse(SetIOS);
        const dir = args['dir'];
        const version = flags.version;
        const build = flags.build;
        const iosProjectPath = flags.iosproject;
        const iosPlistPath = flags.iosplist;
        try {
            (0, utils_capacitor_1.checkForCapacitorProject)(dir);
            (0, utils_ios_1.checkForIOSPlatform)(dir, iosPlistPath);
            // In legacy xCode projects, the version information was stored inside info.plist file.
            // For modern projects, it is stored in project.pbxproj file.
            // The command will handle both legacy and modern projects.
            if ((0, utils_ios_1.isLegacyIOSProject)(dir, iosPlistPath)) {
                this.warn('Legacy iOS project detected, please update to the latest xCode');
                (0, utils_ios_1.setIOSVersionAndBuildLegacy)(dir, iosPlistPath, version, build);
            }
            else {
                (0, utils_ios_1.setIOSVersionAndBuild)(dir, iosProjectPath, version, build);
            }
        }
        catch (error) {
            if (error instanceof custom_error_1.default) {
                this.error(error, { exit: -1, code: error.code, message: error.message, suggestions: error.suggestions });
            }
            this.error('Unknown error', { exit: -1, message: 'Unknown error', code: 'ERR_UNKNOWN' });
        }
        return { version, build };
    }
}
exports.default = SetIOS;
SetIOS.description = 'Set iOS project version and build number';
SetIOS.examples = ['<%= config.bin %> <%= command.id %> /project/path -v 1.0.0-rc1 -b 10'];
SetIOS.args = [...custom_command_1.default.args];
SetIOS.flags = { ...custom_command_1.default.flags };
