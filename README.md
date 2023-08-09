# AviForm

![npm](https://img.shields.io/npm/v/avi-form) ![license](https://img.shields.io/github/license/davidulman/aviform)

**AviForm** is a flexible and easy-to-use form component built on top of React, Material-UI and react-form-hook.
It simplifies the process of creating different types of input fields by providing a single interface.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Examples](#examples)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install using npm:

```bash
npm install avi-form --save
```

Or With yarn:

```bash
yarn add avi-form
```

## Usage

### Basic Usage

To start using AviForm:

```typescript
import { AviForm, useAviForm, create } from 'avi-form';
const { formProps } = useAviForm(config);
<AviForm formProps={formProps} />;
```

### Examples

```typescript
const { formProps } = useAviForm({
  fields: [
    createHeader({ label: 'Personal Information' }),
    createTextField({
      label: 'Vorname',
      name: 'firstName',
      getValue: (value) => value.lastName.length === 0 && { disabled: true },
    }),
    createTextField({
      label: 'Nachname',
      name: 'lastName',
      onValueChange(setValue, value) {
        if (value === 'Form') {
          setValue('firstName', 'Avi');
        }
      },
    }),
    createAutocomplete({
      name: 'country',
      label: 'Country',
      options: ['USA', 'UK', 'Canada'],
    }),
    createDatePicker({ name: 'birthdate', label: 'Birth Date' }),
    createButton({ label: 'Submit' }),
  ],
  onSubmit: (data) => console.log(data),
});

return <AviForm formProps={formProps} />;
```

## FAQ

Q: How do I use AviForm in my project?
A: Simply install the avi-form package via npm or yarn, then use the useAviForm hook to generate form properties and pass them to the AviForm component.

Q: What versions of React does AviForm support?
A: AviForm supports React 18 and above. If you encounter any issues with older versions of React, consider upgrading or open an issue in the GitHub repository.

Q: Are there any plans to support other UI libraries in the future?
A: As of now, AviForm is primarily built for Material-UI. However, contributions are always welcome to expand its compatibility with other libraries.

## Contributing

We welcome contributions to AviForm, but we do maintain some strict guidelines to ensure the quality and consistency of the codebase. Please read and adhere to the following before submitting a pull request:

1. **Fork and Clone the Repository**: Start by forking the repository and then clone your fork to your local machine.

2. **Create a Feature Branch**: Always create a new branch for your changes. Avoid working directly on the `main` branch.

3. **Follow Coding Standards**: Ensure that your code follows the existing coding conventions and standards used throughout the project.

4. **Update Documentation**: Update the README or other documentation to reflect any changes or additions you have made.

5. **Submit a Pull Request**: Create a pull request from your fork to the original repository. Provide a detailed description of your changes and reference any related issues.

6. **Respond to Feedback**: Be prepared to address feedback on your pull request. Changes may be requested before your pull request is accepted.

7. **No Direct Commits to `main`**: Direct commits to the `main` branch are strictly prohibited. All changes must come through pull requests.

By following these guidelines, you help ensure that AviForm remains a high-quality, maintainable project. If you have any questions about the contribution process, please open an issue or reach out to a maintainer.

Thank you for your interest in contributing to AviForm!

## License

AviForm is [MIT licensed](https://github.com/davidulman/aviform/blob/main/LICENSE).

# AviForm
