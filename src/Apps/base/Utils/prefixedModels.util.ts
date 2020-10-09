const prefixModels = (prefix: string, models: any) => {
    const prefixed = {};

    Object.keys(models).forEach(sub => {
        prefixed[sub] = {};
        Object.keys(models[sub]).forEach(key => {
            prefixed[sub][`${prefix}_${key}`] = models[sub][key]
        });
    });

    return prefixed;
}

export default prefixModels;