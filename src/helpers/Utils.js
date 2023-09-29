import moment from 'moment';

export const float2Currency  = (float) => {
    if(float == null){
        float = 0;
    }
    return (float).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    })
}

export const disabledEndDate = (current, target) => {
    return current && current < moment(target).endOf('day');
}

export const disabledStartDate = (current, target) => {
    return current && current >= moment(target).endOf('day');
}