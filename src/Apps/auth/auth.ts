import derby from 'derby';

// import DerbyApplication from '../base';
import models from './Models';

import RegisterComponent from './Components/register';
import { initializeComponents } from '../base/application';

const components = [
    RegisterComponent
]

const app = derby.createApp('auth', __filename);

app.loadViews(__dirname + '/Views/register.html');

initializeComponents(app, components);

export default app;