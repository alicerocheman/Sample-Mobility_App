import { createBrowserHistory, createHashHistory } from 'history';
import { ON_HYBRID_APP } from 'constants/env';

export default (ON_HYBRID_APP ? createHashHistory() : createBrowserHistory());
