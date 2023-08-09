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

import {
  AviAutocompleteProps,
  AviButtonProps,
  AviDatePickerProps,
  AviHeaderProps,
  AviInputType,
  AviTextFieldProps,
} from '../types/Interface';
/**
 * Creates a configuration object for a text field.
 * @example
 * ```javascript
 * createTextField({ name: 'email', label: 'Email', onChange: value => value.trim(), onValueChange: (setValue, value) => setValue('username', value) otherTextFieldProps: { disabled: false } });
 * ```
 */
const createTextField = (props: Omit<AviTextFieldProps, 'fieldType'>) => ({
  fieldType: AviInputType.TEXT,
  ...props,
});

/**
 * Creates a configuration object for a date picker.
 * @example
 * ```javascript
 * createDatePicker({ name: 'birthdate', label: 'Birth Date', otherDatePickerProps: { disableFuture: true } });
 * ```
 */
const createDatePicker = (props: Omit<AviDatePickerProps, 'fieldType'>) => ({
  fieldType: AviInputType.DATE,
  ...props,
});

/**
 * Creates a configuration object for an autocomplete input.
 * @example
 * ```javascript
 * createAutocomplete({ name: 'country', label: 'Country', options: ['USA', 'UK', 'Canada'] otherAutocompleteProps: { disabled: false } });
 * ```
 */
const createAutocomplete = (
  props: Omit<AviAutocompleteProps, 'fieldType'>
) => ({
  fieldType: AviInputType.AUTOCOMPLETE,
  ...props,
});

/**
 * Creates a configuration object for a header.
 * @example
 * ```javascript
 * createHeader({ label: 'Personal Information' });
 * ```
 */
const createHeader = (props: Omit<AviHeaderProps, 'fieldType'>) => ({
  fieldType: AviInputType.HEADER,
  ...props,
});

/**
 * Creates a configuration object for a divider header.
 * @example
 * ```javascript
 * createDividerHeader({ label: 'Contact Details' });
 * ```
 */
const createDividerHeader = (props: Omit<AviHeaderProps, 'fieldType'>) => ({
  fieldType: AviInputType.DIVIDER_HEADER,
  ...props,
});

/**
 * Creates a configuration object for a button.
 * @example
 * ```javascript
 * createButton({ label: 'Submit', type: 'submit', color: 'primary', otherButtonProps: { disabled: true } });
 * ```
 */
const createButton = (props: Omit<AviButtonProps, 'fieldType'>) => ({
  fieldType: AviInputType.BUTTON,
  ...props,
});

export {
  createTextField,
  createDatePicker,
  createAutocomplete,
  createHeader,
  createDividerHeader,
  createButton,
};
