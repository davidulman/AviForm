/*
 * AviForm - Form Management Utility
 *
 * Copyright (c) 2023 David Ulman
 *
 * This software is provided 'as-is', without any express or implied warranty.
 * In no event will the authors be held liable for any damages arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * subject to the following restrictions:
 *
 * 1. The origin of this software must not be misrepresented; you must not claim
 *    that you wrote the original software. If you use this software in a product,
 *    an acknowledgment in the product documentation would be appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be misrepresented
 *    as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */

import { useForm } from 'react-hook-form';
import { UseAviFormConfig, UseAviFormResult } from '../types/Interface';
/**
 * Custom hook to handle forms with various input types.
 *
 * @param {UseAviFormConfig} config - The configuration object for the form.
 * @returns {UseAviFormResult} An object containing form-related methods and props.
 *
 * @remarks
 * For `text`, `autocomplete`, and `date` field types, if initial values are not provided, the hook will auto-generate them based on their name.
 *
 * @example
 * ```javascript
 * import { aviForm, useAviForm, createTextField, createAutocomplete, createDatePicker, createButton } from 'avi-form';
 *
 * const { formProps } = useAviForm({
 *   fields: [
 *      createHeader({ label: 'Personal Information' }),
 *      createTextField({
 *        label: 'Vorname',
 *        name: 'firstName', 
 *        getValue: (value) => value.lastName.length === 0 && { disabled: true }
 * }),
    createTextField({
      label: 'Nachname',
      name: 'lastName',
      onValueChange(setValue, value) {
        if (value === 'Form') {
          setValue('firstName', 'Avi');
        }
      },
    }),
 *     createAutocomplete({ name: 'country', label: 'Country', options: ['USA', 'UK', 'Canada'] }),
 *     createDatePicker({ name: 'birthdate', label: 'Birth Date' }),
 *     createButton({ label: 'Submit' }),
 *     
 *   ],
 *   onSubmit: (data) => console.log(data)
 * });
 *
 * return(
 *  <AviForm formProps={formProps} />
 * )
 * ```
 */
export const useAviForm = ({
  fields,
  onSubmit,
  initialValues,
}: UseAviFormConfig): UseAviFormResult => {
  // const autoGeneratedInitValues = fields.reduce<{ [key: string]: any }>(
  //   (acc, field) => {
  //     switch (field.fieldType) {
  //       case 'text':
  //         acc[field.name || ''] = '';
  //         break;
  //       case 'autocomplete':
  //         acc[field.name || ''] = undefined;
  //         break;
  //       case 'date':
  //         acc[field.name || ''] = null;
  //         break;
  //       default:
  //         break;
  //     }
  //     return acc;
  //   },
  //   {}
  // );

  // const mergedInitValues = { ...autoGeneratedInitValues, ...initialValues };

  const { handleSubmit, control, watch, setValue, getValues } = useForm({
    defaultValues: initialValues ? initialValues : undefined,
  });

  return {
    formProps: {
      inputs: fields,
      control,
      watch,
      setValue,
      getValues,
      handleSubmit,
      onSubmit: (data) => onSubmit(data),
      initValues: initialValues,
    },
    watch,
  };
};
