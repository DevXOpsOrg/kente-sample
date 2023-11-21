// import handlebars from "handlebars";
// import { Dirent, promises } from 'fs';
//
// const { writeFile, mkdir } = promises;
//
// export async function renderTemplate(content: string): Promise<Handlebars.TemplateDelegate<any>> {
//     return handlebars.compile(content);
// }
//
// async function writeTemplateFile(fileName: string, fileContent: string): Promise<void> {
//     await mkdir(fileName.substring(0, fileName.lastIndexOf('/')), {
//         recursive: true,
//     }).then(() => writeFile(fileName, fileContent));
// }
