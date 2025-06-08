import React from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { FormGroup } from '@/components/molecules/FormGroup';
import { ReactSelect, OptionType } from '@/components/atoms/ReactSelect';

const challengesOptions: OptionType[] = [
  { value: 'Comunicación', label: 'Comunicación' },
  { value: 'Falta de confianza o celos', label: 'Falta de confianza o celos' },
  { value: 'Falta de intimidad', label: 'Falta de intimidad' },
  { value: 'Dificultades económicas', label: 'Dificultades económicas' },
  { value: 'Diferencias en crianza de hijos', label: 'Diferencias en crianza de hijos' },
  { value: 'Carga mental / tareas del hogar', label: 'Carga mental / tareas del hogar' },
  { value: 'Infidelidad', label: 'Infidelidad' },
  { value: 'Otro', label: 'Otro' },
];

const expectationsOptions: OptionType[] = [
  { value: 'Sentirme escuchado/a y comprendido/a', label: 'Sentirme escuchado/a y comprendido/a' },
  { value: 'Consejos para comunicarme mejor', label: 'Consejos para comunicarme mejor' },
  { value: 'Ver las cosas desde la perspectiva de mi pareja', label: 'Ver las cosas desde la perspectiva de mi pareja' },
  { value: 'Apoyo emocional', label: 'Apoyo emocional' },
  { value: 'No estoy seguro/a aún', label: 'No estoy seguro/a aún' },
];

export const StepTwo = () => {
  const { control, formState: { errors } } = useFormContext();

  const {
    field: { onChange: onChallengesChange, value: challengesValue },
    fieldState: { error: challengesError },
  } = useController({
    name: 'challenges',
    control,
    defaultValue: [],
  });

  const {
    field: { onChange: onExpectationsChange, value: expectationsValue },
    fieldState: { error: expectationsError },
  } = useController({
    name: 'expectations',
    control,
    defaultValue: [],
  });

  // Convert form values (array of strings) to react-select options
  const selectedChallenges = Array.isArray(challengesValue)
    ? challengesValue.map(val => challengesOptions.find(o => o.value === val)).filter(Boolean)
    : [];

  const selectedExpectations = Array.isArray(expectationsValue)
    ? expectationsValue.map(val => expectationsOptions.find(o => o.value === val)).filter(Boolean)
    : [];

  return (
    <>
      <FormGroup label="¿Con qué tipo de desafíos están lidiando como pareja?" htmlFor="challenges" error={challengesError?.message || errors.challenges?.message}>
        <ReactSelect
          isMulti
          options={challengesOptions}
          value={selectedChallenges}
          onChange={(selected) => {
            onChallengesChange(selected ? selected.map(s => s.value) : []);
          }}
          placeholder="Selecciona una o más opciones"
          isClearable
          className="w-full"
          error={challengesError?.message || errors.challenges?.message}
        />
      </FormGroup>

      <FormGroup label="¿Qué esperas obtener de esta experiencia con la IA?" htmlFor="expectations" error={expectationsError?.message || errors.expectations?.message}>
        <ReactSelect
          isMulti
          options={expectationsOptions}
          value={selectedExpectations}
          onChange={(selected) => {
            onExpectationsChange(selected ? selected.map(s => s.value) : []);
          }}
          placeholder="Selecciona una o más opciones"
          isClearable
          className="w-full"
          error={expectationsError?.message || errors.expectations?.message}
        />
      </FormGroup>
    </>
  );
};