import { InputText } from '@/components/atoms/InputText'
import { Radio } from '@/components/atoms/Radio'
import { ReactSelect } from '@/components/atoms/ReactSelect'
import React, { FC } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { FormGroup } from '../FormGroup'

interface OptionType {
  label: string
  value: string
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any
  options?: OptionType[] | string[] | undefined
}

export const FormFieldRenderer: FC<Props> = ({ field }) => {
  const {
    control,
    setValue,
    register,
    watch,
    formState: { errors },
  } = useFormContext()
  const {
    name,
    type,
    label,
    showIf,
    render,
    options,
    htmlFor,
    errorKey,
    inputType,
    placeholder,
  } = field

  const {
    field: fieldProps,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue:
      field.defaultValue ?? (type === 'select' || type === 'radio' ? null : ''),
  })

  if (showIf && !showIf(watch)) return null

  let fieldEl: React.ReactNode = null

  switch (type) {
    case 'text':
    case 'number':
      fieldEl = (
        <InputText
          type={inputType || type}
          id={name}
          {...register(name)}
          placeholder={placeholder}
        />
      )
      break
    case 'select':
      fieldEl = (
        <ReactSelect
          isClearable={field.isClearable ?? true}
          isMulti={field.isMulti ?? false}
          options={options}
          value={
            field.isMulti
              ? (fieldProps.value ?? [])
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  .map((val: any) => options.find((o: any) => o.value === val))
                  .filter(Boolean)
              : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (options?.find((o: any) => o.value === fieldProps.value) ??
                null)
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(selected: any) =>
            fieldProps.onChange(
              field.isMulti
                ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (selected?.map((s: any) => s.value) ?? [])
                : (selected?.value ?? null),
            )
          }
          className="w-full"
          error={error?.message || errors?.[name]?.message}
        />
      )
      break
    case 'radio':
      fieldEl = (
        <div className="flex flex-col space-y-2">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {options.map((option: { value: any; label: any }) => (
            <Radio
              name={name}
              key={option.value}
              label={option.label || option}
              value={option.value || option}
              checked={fieldProps.value === (option.value || option)}
              onChange={() =>
                setValue(name, option.value || option, { shouldValidate: true })
              }
            />
          ))}
        </div>
      )
      break
    case 'custom':
      fieldEl = render
        ? render(
            { ...fieldProps, value: fieldProps.value ?? '' }, // Ensure value is never undefined
            { error },
          )
        : null
      break
  }

  return (
    <FormGroup
      label={label}
      htmlFor={htmlFor || name}
      error={error?.message || errors?.[errorKey || name]?.message}
      shouldShow={field.shouldShow ? field.shouldShow(watch) : true}
    >
      {fieldEl}
    </FormGroup>
  )
}
