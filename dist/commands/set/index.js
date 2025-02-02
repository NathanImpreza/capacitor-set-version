"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_command_1 = require("../../common/custom-command");
const android_1 = require("./android");
const ios_1 = require("./ios");
class Set extends custom_command_1.default {
    async run() {
        const { args, flags } = await this.parse(Set);
        const dir = args['dir'];
        const version = flags.version;
        const build = flags.build;
        const iosProjectPath = flags.iosproject;
        const iosPlistPath = flags.iosplist;
        await android_1.default.run([dir, '-v', version, '-b', build.toString()]);
        await ios_1.default.run([dir, '--iosplist', iosPlistPath, '--iosproject', iosProjectPath, '-v', version, '-b', build.toString()]);
        return { version, build };
    }
}
exports.default = Set;
Set.description = 'Set Android and iOS app version and build number for capacitorjs projects.';
Set.examples = ['<%= config.bin %> <%= command.id %> /project/path -v 1.0.0-rc1 -b 10'];
Set.args = [...custom_command_1.default.args];
Set.flags = { ...custom_command_1.default.flags };
