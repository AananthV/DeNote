import derby from 'derby';

// import DerbyApplication from '../base';
import models from './Models';

import RegisterComponent from './Components/register';
import { initializeComponents } from '../base/application';

const components = [
    RegisterComponent
]

const app = derby.createApp('auth', __filename);

// app.serverUse(module, '../base/Utils/derbyLess');

app.loadViews('/home/aananth/dev/NoteD/views/auth/Pages/register.html');

initializeComponents(app, components);

export default app;