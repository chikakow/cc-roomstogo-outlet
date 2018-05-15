export const StringUtility = {

  ReplaceAll: (target: string, replace: string, replaceWith: string): string => {
    return target.replace(new RegExp(replace, 'g'), replaceWith);
  },

  ToPascalCase: (target: string): string => {
    return target.replace(new RegExp('-', 'g'), ' ').replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase()));
  }
};
