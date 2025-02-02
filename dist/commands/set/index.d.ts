import CustomCommand from '../../common/custom-command';
import { VersionInfo } from '../../common/version-info.type';
export default class Set extends CustomCommand {
    static description: string;
    static examples: string[];
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
    run(): Promise<VersionInfo>;
}
