import compose from '../compose';

import getCurrency from '../getCurrency';
import reduceTotal from '../reduceTotal';

const getCurrencyReduceTotal = compose(getCurrency, reduceTotal);

export default getCurrencyReduceTotal;
