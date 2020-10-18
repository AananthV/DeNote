import derby from 'derby';

export const initializeComponents = (derbyApp: any, components: any[]) => {
    components.forEach(component => {
        derbyApp.component(component);
    });
}

export const initializeModels = () => {};

export default ({name, filename, components}) => {
    const app = derby.createApp(name, filename);

    initializeComponents(app, components);

    return app;
}