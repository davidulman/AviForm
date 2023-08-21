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
  AutocompleteProps,
  TextFieldProps,
  TypographyProps,
  UseAutocompleteProps,
  ButtonProps,
  GridProps,
} from '@mui/material';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { Control, SetValueConfig } from 'react-hook-form';

export interface AviTextFieldProps {
  // formName: string;
  name: string;
  label: string;
  onChange?: (value: any) => any;
  onValueChange?: (
    setValue: (name: string, value: any, options?: SetValueConfig) => void,
    value: any
  ) => void;
  value?: unknown;
  getValue?: (values: any) => any;
  changeValue?: (values: any) => any;
  xs?: number;
  sm?: number;
  md?: number;
  otherTextFieldProps?: TextFieldProps;
  otherGridProps?: GridProps;
  defaultValue?: string | number | unknown;
  listenToChanges?: string;
}
export interface AviAutocompleteProps extends AviTextFieldProps {
  options: string[] | Record<string, any>[];
  otherAutocompleteProps?: Omit<
    AutocompleteProps<any, true, false, false, 'div'>,
    'renderInput' | 'options'
  >;
}
export interface AviDatePickerProps extends AviTextFieldProps {
  otherDatePickerProps?: DatePickerProps<any>;
}

export interface AviHeaderProps {
  label: string;
  headerProps?: TypographyProps;
  name?: string;
  xs?: number;
  sm?: number;
  md?: number;
  otherGridProps?: GridProps;
}

export interface AviButtonProps {
  name?: string;
  label: string;
  onClick?: () => void;
  type?: 'submit' | any;
  variant?: ButtonProps['variant'];
  color?: ButtonProps['color'];
  key?: string;
  otherProps?: ButtonProps;
  xs?: number;
  sm?: number;
  md?: number;
  otherGridProps?: GridProps;
}

export enum AviInputType {
  TEXT = 'text',
  DATE = 'date',
  AUTOCOMPLETE = 'autocomplete',
  HEADER = 'header',
  DIVIDER_HEADER = 'dividerHeader',
  BUTTON = 'button',
  DIVIDER = 'divider',
}

export interface AviBaseInputProps {
  fieldType: AviInputType;
}
export type AviInput =
  | (AviTextFieldProps & AviBaseInputProps)
  | (AviAutocompleteProps & AviBaseInputProps)
  | (AviDatePickerProps & AviBaseInputProps)
  | (AviHeaderProps & AviBaseInputProps)
  | (AviButtonProps & AviBaseInputProps);

export interface AviFormProps {
  formProps: {
    inputs: AviInput[];
    control: Control;
    watch: any;
    setValue: any;
    handleSubmit: any;
    onSubmit: (v: any) => void;
  };
}

export interface UseAviFormResult {
  formProps: {
    inputs: AviInput[];
    control: any;
    watch: any;
    setValue: any;
    handleSubmit: any;
    onSubmit: (data: any) => void;
  };
  watch: any;
}
export interface UseAviFormConfig {
  fields: AviInput[];
  onSubmit: (values: any) => void;
  initialValues?: Record<string, any>;
}
