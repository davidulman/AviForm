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

import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Autocomplete,
  Divider,
  TextFieldProps,
  styled,
  AutocompleteRenderInputParams,
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

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    webkitFontSmoothing: 'antialiased',
    textSizeAdjust: '100%',
    fontWeight: 400,
  },
  '& .MuiInputBase-root': {
    borderRadius: '8px',
  },
});
const StyledAutocomplete = styled(Autocomplete)({
  '& .MuiAutocomplete-inputRoot': {
    borderRadius: '8px',
  },
});

const StyledDatePicker = styled(DatePicker)({
  '& .MuiInputBase-input': {
    webkitFontSmoothing: 'antialiased',
    textSizeAdjust: '100%',
    fontWeight: 400,
  },
  '& .MuiInputBase-root': {
    borderRadius: '8px',
  },
});

export const AviForm: React.FC<AviFormProps> = ({ formProps }) => {
  const {
    inputs,
    onSubmit,
    handleSubmit,
    control,
    watch,
    setValue,
    initValues,
  } = formProps;
  const fieldValue = watch();

  const renderTextField = (userFields: AviTextFieldProps) => (
    <Controller
      name={userFields.name}
      key={userFields.name + userFields.value}
      control={control}
      defaultValue={
        (initValues && initValues[userFields?.name]) || userFields.value || ''
      }
      render={({ field: { onChange, value, ...restFieldProps } }) => (
        <StyledTextField
          key={userFields.name + userFields.value}
          label={userFields.label}
          variant="outlined"
          fullWidth
          value={userFields.value || value || ''}
          disabled={userFields.otherTextFieldProps?.disabled || false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(userFields.name, userFields.value);
            onChange(e.target.value);
            if (userFields.listenToChanges) {
              setValue(userFields.listenToChanges, e.target.value);
            }
            if (userFields.onChange) {
              userFields.onChange(e.target.value);
            }
            if (userFields.onValueChange) {
              userFields.onValueChange(setValue, watch());
            }
          }}
          //   {
          //   let updatedValue = e.target.value;
          //   if (userFields.onChange) {
          //     updatedValue = userFields.onChange(updatedValue);
          //   }

          //   if (userFields.onValueChange) {
          //     userFields.onValueChange(setValue, updatedValue);
          //   }

          //   setValue(userFields.name, updatedValue);
          //   // onChange(updatedValue);
          // }}
          {...restFieldProps}
          {...userFields?.otherTextFieldProps}
          {...(userFields.getValue ? userFields.getValue(fieldValue) : {})}
          {...(userFields?.setValue
            ? setValue(userFields.name, userFields?.setValue)
            : {})}
        />
      )}
    />
  );

  const renderDatePicker = (field: AviDatePickerProps) => (
    <Controller
      key={field.name}
      control={control}
      name={field.name}
      defaultValue={(initValues && dayjs(initValues[field.name])) || null}
      render={({ field: { ...restFieldProps } }) => (
        <StyledDatePicker
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
      defaultValue={
        (initValues && initValues[field?.name]) ||
        field.value ||
        field.otherAutocompleteProps?.defaultValue ||
        undefined
      }
      render={({ field: controlProps }) => (
        <StyledAutocomplete
          {...controlProps}
          id={field.name}
          key={field.name}
          options={field.options || []}
          isOptionEqualToValue={(option: unknown, value: unknown) =>
            option === value
          }
          renderInput={(params: AutocompleteRenderInputParams) => (
            <TextField
              key={field.name}
              {...params}
              label={field.label}
              {...(field?.otherTextFieldProps as TextFieldProps)}
            />
          )}
          onChange={(_: any, data: string) => {
            controlProps.onChange(data);

            if (field.onValueChange) {
              field.onValueChange(setValue, watch());
            }
          }}
          {...field?.otherAutocompleteProps}
          value={field.value || controlProps.value || undefined}
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

  const renderChildren = (field: any) => <>{field.children}</>;

  const renderButton = (field: AviButtonProps) => (
    <Button
      type={field.type || 'submit'}
      variant={field.variant || 'outlined'}
      color={field.color || 'primary'}
      onClick={field.onClick}
      {...(field?.otherProps || {})}
      {...(field.getValue ? field.getValue(fieldValue) : {})}
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
    children: renderChildren,
    divider: renderDivider,
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} key="form">
      <Grid
        container
        key="form"
        direction="row"
        justifyContent="flex-start"
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
              {RenderField(field)}
            </Grid>
          );
        })}
      </Grid>
    </form>
  );
};

export default AviForm;
