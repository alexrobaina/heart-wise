import Select, {
  MultiValue,
  ActionMeta,
  StylesConfig,
  GroupBase,
  SingleValue,
  components,
  MultiValueGenericProps,
} from 'react-select'
import makeAnimated from 'react-select/animated'
import React from 'react'

export interface OptionType {
  label: string
  value: string
}

export interface BaseSelectProps {
  name?: string
  isMulti?: boolean
  className?: string
  isLoading?: boolean
  placeholder?: string
  options: OptionType[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: boolean | string | any
  isClearable?: boolean
  closeMenuOnSelect?: boolean
  value?: OptionType | OptionType[] | null
  customComponents?: {
    [key: string]: React.ComponentType<{
      data: OptionType
      isSelected: boolean
      isFocused: boolean
    }>
  }
  onChange: (
    newValue: MultiValue<OptionType> | SingleValue<OptionType>,
    actionMeta?: ActionMeta<OptionType>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => void | any
}

const TruncatedMultiValueLabel = (
  props: MultiValueGenericProps<OptionType>,
) => {
  return (
    <components.MultiValueLabel {...props}>
      <span
        style={{
          maxWidth: '100px',
          display: 'inline-block',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          verticalAlign: 'bottom',
        }}
      >
        {props.data.label}
      </span>
    </components.MultiValueLabel>
  )
}

export const ReactSelect = ({
  name,
  error,
  value,
  options,
  onChange,
  isLoading,
  className,
  placeholder,
  isMulti = false,
  customComponents,
  isClearable = false,
  closeMenuOnSelect = true,
}: BaseSelectProps) => {
  const customStyles: StylesConfig<
    OptionType,
    boolean,
    GroupBase<OptionType>
  > = {
    control: (provided) => ({
      ...provided,
      minHeight: '40px',
      maxHeight: 'auto',
      borderColor: error ? '#ef4444' : '#99A1AE',
      boxShadow: 'none',
      ':hover': {
        borderColor: error ? '#ef4444' : '',
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 40,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#ff6647'
        : state.isFocused
          ? '#ffe5e0'
          : 'white',
      color: state.isSelected ? 'white' : '#374151',
      padding: '8px 12px',
      cursor: 'pointer',
      ':active': {
        backgroundColor: state.isSelected ? '#ff6647' : '',
      },
    }),
    input: (provided) => ({
      ...provided,
      color: '#374151',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#ffe5e0',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#b02816',
      maxWidth: '100px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),
  }

  const components = {
    ...makeAnimated(),
    ...customComponents,
    ClearIndicator: () => <></>,
    MultiValueLabel: TruncatedMultiValueLabel,
  }

  return (
    <div className={className}>
      <Select
        name={name}
        value={value}
        options={options}
        isMulti={isMulti}
        onChange={onChange}
        styles={customStyles}
        isLoading={isLoading}
        components={components}
        placeholder={placeholder}
        isClearable={isClearable}
        closeMenuOnSelect={closeMenuOnSelect}
      />
    </div>
  )
}
