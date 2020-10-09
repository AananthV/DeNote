export const initializeComponents = (derbyApp: any, components: any[]) => {
    components.forEach(component => {
        derbyApp.component(component);
    });
}

export const initializeModels = () => {};