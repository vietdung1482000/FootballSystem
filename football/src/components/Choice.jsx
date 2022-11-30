const Choice = (props) => {
    const { data, onChange, className, type, checked, viewMode, id, disabled } = props;

    const onChangeCheckboxValues = (value) => {
        const valueChecked = checked ?? [];

        const existedIndex = valueChecked.indexOf(value);
        if (existedIndex >= 0) {
            valueChecked.splice(existedIndex, 1);
        } else {
            valueChecked.push(value);
        }

        if (onChange) {
            onChange(valueChecked);
        }
    };

    if (type === 'checkbox') {
        return (
            <div className={`components__choice ${viewMode === 'horizontal' ? 'd-flex align-items-center flex-wrap' : ''} ${className}`}>
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`${item.label ? (viewMode === 'horizontal' ? 'bases__margin--right16' : 'bases__margin--vertical16') : ''
                            } d-flex align-items-center`}
                    >
                        <input
                            className={`${item.label ? 'bases__margin--right4' : ''}`}
                            onChange={(event) => onChangeCheckboxValues(event.target.value)}
                            type="checkbox"
                            value={item.value}
                            id={`${id}_${item.id}`}
                            checked={checked && checked?.includes(item.value ?? '')}
                            disabled={disabled}
                        />
                        <label htmlFor={`${id}_${item.id}`}>{item.label}</label>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={`components__choice ${viewMode === 'horizontal' ? 'd-flex align-items-center flex-wrap' : ''} ${className}`}>
            {data.map((item, index) => (
                <div
                    key={index}
                    className={`${item.label ? (viewMode === 'horizontal' ? 'bases__margin--right16' : 'bases__margin--vertical16') : ''
                        } d-flex align-items-center`}
                >
                    <input
                        className={`${item.label ? 'bases__margin--right4' : ''}`}
                        type="radio"
                        value={item.value}
                        name={id}
                        id={`${id}_${item.id}`}
                        checked={checked && checked?.includes(item.value ?? '')}
                        disabled={disabled}
                        onChange={(event) => (onChange ? onChange([event.target.value]) : {})}
                    />
                    <label htmlFor={`${id}_${item.id}`}>{item.label}</label>
                </div>
            ))}
        </div>
    );
};

Choice.defaultProps = {
    className: '',
    type: 'radio',
    checked: [],
    viewMode: 'horizontal',
    id: 'choice',
};

export default Choice;
