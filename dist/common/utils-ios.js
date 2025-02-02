"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIOSVersionAndBuildLegacy = exports.setIOSVersionAndBuild = exports.isLegacyIOSProject = exports.checkForIOSPlatform = void 0;
const fs = require("fs");
const plist = require("plist");
const path = require("path");
const custom_error_1 = require("./custom-error");
function checkForIOSPlatform(dir, iosPlistFilePath) {
    const iosFolderPath = path.join(dir, 'ios');
    if (!fs.existsSync(iosFolderPath)) {
        throw new custom_error_1.default(`Invalid iOS platform: folder ${iosFolderPath} does not exist`, {
            code: 'ERR_IOS',
            suggestions: ['Make sure your Capacitor project has the ios platform added'],
        });
    }
    const infoPlistFilePath = path.join(dir, 'ios', iosPlistFilePath);
    if (!fs.existsSync(infoPlistFilePath)) {
        throw new custom_error_1.default(`Invalid iOS platform: file ${infoPlistFilePath} does not exist`, {
            code: 'ERR_IOS',
            suggestions: ['Check the integrity of your ios folder', 'Add again the ios platform to your project'],
        });
    }
}
exports.checkForIOSPlatform = checkForIOSPlatform;
function isLegacyIOSProject(dir, iosPlistFilePath) {
    const infoPlistFilePath = path.join(dir, 'ios', iosPlistFilePath);
    const file = fs.readFileSync(infoPlistFilePath);
    return !file.includes('$(MARKETING_VERSION)');
}
exports.isLegacyIOSProject = isLegacyIOSProject;
function setIOSVersionAndBuild(dir, iosProjectFilePath, version, build) {
    const projectFilePath = path.join(dir, 'ios', iosProjectFilePath);
    let file = openIOSProjectFile(projectFilePath);
    file = setIOSVersion(file, version);
    file = setIOSBuild(file, build);
    saveIOSProjectFile(projectFilePath, file);
}
exports.setIOSVersionAndBuild = setIOSVersionAndBuild;
function setIOSVersionAndBuildLegacy(dir, iosPlistFilePath, version, build) {
    const plistFilePath = path.join(dir, 'ios', iosPlistFilePath);
    let file = openInfoPlistFile(plistFilePath);
    const parsed = plist.parse(file);
    setIOSVersionLegacy(parsed, version);
    setIOSBuildLegacy(parsed, build);
    file = plist.build(parsed);
    saveInfoPlistFile(plistFilePath, file);
}
exports.setIOSVersionAndBuildLegacy = setIOSVersionAndBuildLegacy;
function openIOSProjectFile(projectFilePath) {
    try {
        return fs.readFileSync(projectFilePath, 'utf-8');
    }
    catch (error) {
        throw new custom_error_1.default(`Invalid iOS project file: file ${projectFilePath} does not exist`, {
            code: 'ERR_IOS',
        });
    }
}
function saveIOSProjectFile(projectFilePath, file) {
    fs.writeFileSync(projectFilePath, file, 'utf-8');
}
function setIOSVersion(file, version) {
    checkIfVersionExist(file);
    return file.replace(/(MARKETING_VERSION = ).*/g, `MARKETING_VERSION = ${version};`);
}
function checkIfVersionExist(file) {
    if (file.match(/(MARKETING_VERSION = ).*/g))
        return;
    throw new custom_error_1.default(`Could not find "MARKETING_VERSION" in project.pbxproj file`, {
        code: 'ERR_IOS',
        suggestions: [
            'Check if "MARKETING_VERSION" is found inside file ios/App/App.xcodeproj/project.pbxproj file.',
            'Update you iOS xCode project to auto manage the project version',
        ],
    });
}
function setIOSBuild(file, build) {
    checkIfBuildNumberExist(file);
    return file.replace(/(CURRENT_PROJECT_VERSION = ).*/g, `CURRENT_PROJECT_VERSION = ${build};`);
}
function checkIfBuildNumberExist(file) {
    if (file.match(/(CURRENT_PROJECT_VERSION = ).*/g))
        return;
    throw new custom_error_1.default(`Could not find "CURRENT_PROJECT_VERSION" in project.pbxproj file`, {
        code: 'ERR_IOS',
        suggestions: [
            'Check if "CURRENT_PROJECT_VERSION" is found inside file ios/App/App.xcodeproj/project.pbxproj file.',
            'Update you iOS xCode project to auto manage the project version',
        ],
    });
}
function openInfoPlistFile(plistFilePath) {
    return fs.readFileSync(plistFilePath, 'utf-8');
}
function saveInfoPlistFile(plistFilePath, file) {
    fs.writeFileSync(plistFilePath, file, 'utf-8');
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setIOSVersionLegacy(infoPlist, version) {
    infoPlist.CFBundleShortVersionString = version;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setIOSBuildLegacy(infoPlist, build) {
    infoPlist.CFBundleVersion = build.toString();
}
