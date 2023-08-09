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

import React from 'react';
import { Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Autocomplete,
  Divider,
  TextFieldProps,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  AviAutocompleteProps,
  AviButtonProps,
  AviDatePickerProps,
  AviFormProps,
  AviHeaderProps,
  AviInputType,
  AviTextFieldProps,
} from './types/Interface';

export const AviForm: React.FC<AviFormProps> = ({ formProps }) => {
  const { inputs, control, handleSubmit, setValue, watch, onSubmit } =
    formProps;

  const fieldValue = watch();

  const renderTextField = (field: AviTextFieldProps) => (
    <Controller
      name={field.name}
      control={control}
      render={({ field: { onChange, value, ...restFieldProps } }) => (
        <TextField
          key={field.name}
          label={field.label}
          variant="outlined"
          fullWidth
          value={field.value || value}
          disabled={field.otherTextFieldProps?.disabled || false}
          onChange={(e) => {
            let updatedValue = e.target.value;
            if (field.onChange) {
              updatedValue = field.onChange(updatedValue);
            }
            if (field.onValueChange) {
              field.onValueChange(setValue, updatedValue);
            }
            onChange(updatedValue);
          }}
          {...restFieldProps}
          {...field?.otherTextFieldProps}
          {...(field.getValue ? field.getValue(fieldValue) : {})}
        />
      )}
    />
  );

  const renderDatePicker = (field: AviDatePickerProps) => (
    <Controller
      key={field.name}
      control={control}
      name={field.name}
      render={({ field: { ...restFieldProps } }) => (
        <DatePicker
          key={field.name}
          label={field.label}
          {...restFieldProps}
          slotProps={{ textField: { fullWidth: true } }}
          {...field?.otherDatePickerProps}
        />
      )}
    />
  );
  const renderAutocomplete = (field: AviAutocompleteProps) => (
    <Controller
      name={field.name}
      control={control}
      defaultValue={null}
      render={({ field: controlProps }) => (
        <Autocomplete
          {...controlProps}
          id={field.name}
          options={field.options || []}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={(params) => (
            <TextField
              {...params}
              label={field.label}
              {...(field?.otherTextFieldProps as TextFieldProps)}
            />
          )}
          onChange={(_, data) => controlProps.onChange(data)}
          {...field?.otherAutocompleteProps}
          value={field.value || controlProps.value}
        />
      )}
    />
  );
  const renderHeader = (field: AviHeaderProps) => (
    <Divider>
      <Typography
        {...(field?.headerProps || {
          variant: 'h4',
          textAlign: 'center',
        })}
      >
        {field.label}
      </Typography>
    </Divider>
  );
  const renderDividerHeader = (field: AviHeaderProps) => (
    <Divider>{field.label}</Divider>
  );
  const renderDivider = () => <Divider />;
  const renderButton = (field: AviButtonProps) => (
    <Button
      type={field.type || 'submit'}
      variant={field.variant || 'outlined'}
      color={field.color || 'primary'}
      onClick={field.onClick}
      {...(field?.otherProps || {})}
    >
      {field.label}
    </Button>
  );

  const renderFunctions: Record<AviInputType, (field: any) => JSX.Element> = {
    text: renderTextField,
    date: renderDatePicker,
    autocomplete: renderAutocomplete,
    header: renderHeader,
    dividerHeader: renderDividerHeader,
    button: renderButton,
    divider: renderDivider,
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} key="form">
      <Grid
        container
        key="form"
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={3}
      >
        {inputs?.map((field) => {
          const RenderField = renderFunctions[field.fieldType];
          return (
            <Grid
              item
              key={field.name || field.label}
              xs={field.xs || 12}
              sm={field.sm || 12}
              md={field.md || 12}
              {...(field?.otherGridProps || {})}
            >
              {RenderField && RenderField(field)}
            </Grid>
          );
        })}
      </Grid>
    </form>
  );
};

export default AviForm;
