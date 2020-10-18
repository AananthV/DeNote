import derby from 'derby';

import Components from './Components';
import Containers from './Containers';

import derbyApp from '../base/application';

const app = derbyApp({
    name: 'denote',
    filename: __filename,
    components: [...Components, ...Containers]
})

app.loadViews(__dirname + '/Views');

app.loadStyles(__dirname + '/Styles');

if (derby.util.isServer) {
    var boostrap = require.resolve('bootstrap/dist/css/bootstrap.min.css');
    app.loadStyles(boostrap);
}

export default app;