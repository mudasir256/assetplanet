import React from 'react';
import { Input, Icon } from 'antd';

const Email = (props) => {    
    return (
        <Input 
            style={props.style}
            placeholder={props.placeholder}
            addonBefore={props.addonBefore ? <Icon type="mail" /> : ''}
            name={props.name}
            size={'large'}
            onChange={props.onChange}
            disabled={props.disabled}
            value={props.value}
        />
    )
}

export default Email;