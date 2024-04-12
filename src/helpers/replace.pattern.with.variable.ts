import {promises} from "fs";

export const replacePatternWitVariable = async (filePath: string, params: any) => {
    const html = await promises.readFile(filePath, "utf8");
    let result = '';
    for (const property in params) {
        result = html.replace(`{{ ${property} }}`, params[property]);
    }
    return result;
}
