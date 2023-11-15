import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import MultiCheck, { Option } from './MultiCheck';

describe('MultiCheck', () => {
  const options: Option[] = [
    { label: 'Option A', value: 'A' },
    { label: 'Option B', value: 'B' },
    { label: 'Option C', value: 'C' },
  ];

  describe('initialize', () => {
    it('renders the label if label provided', () => {
      const { getByText } = render(<MultiCheck label="Test Label" options={options} />);
      expect(getByText('Test Label')).toBeInTheDocument();
    });

    it('renders checkboxes for each option', () => {
      const { getByLabelText } = render(<MultiCheck options={options} />);
      options.forEach((option) => {
        expect(getByLabelText(option.label)).toBeInTheDocument();
      });
    });

    it('renders "Select All" checkbox', () => {
      const { getByLabelText } = render(<MultiCheck options={options} />);
      expect(getByLabelText('Select All')).toBeInTheDocument();
    });

    it('checks "Select All" checkbox when all options are selected', () => {
      const { getByLabelText } = render(<MultiCheck options={options} />);
      options.forEach((option) => {
        fireEvent.click(getByLabelText(option.label));
      });
      expect(getByLabelText('Select All')).toBeChecked();
    });

    it('unchecks "Select All" checkbox when any option is unselected', () => {
      const { getByLabelText } = render(<MultiCheck options={options} />);
      fireEvent.click(getByLabelText(options[0].label)); // Select one option
      expect(getByLabelText('Select All')).not.toBeChecked();
    });

    it('checks all options when "Select All" checkbox is checked', () => {
      const { getByLabelText } = render(<MultiCheck options={options} />);
      fireEvent.click(getByLabelText('Select All'));
      options.forEach((option) => {
        expect(getByLabelText(option.label)).toBeChecked();
      });
    });

    it('unchecks all options when "Select All" checkbox is unchecked', () => {
      const { getByLabelText } = render(<MultiCheck options={options} />);
      fireEvent.click(getByLabelText('Select All')); // Check "Select All"
      fireEvent.click(getByLabelText('Select All')); // Uncheck "Select All"
      options.forEach((option) => {
        expect(getByLabelText(option.label)).not.toBeChecked();
      });
    });
  });
});
