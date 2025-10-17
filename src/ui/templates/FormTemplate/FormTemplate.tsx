import React from 'react';
import { FormGrid, FormSection } from '../../molecule/Form';
import { Input } from '../../atoms/Input';
import { Label } from '../../atoms/Label';
import { Select } from '../../atoms/Select';
import { Button } from '../../atoms/Button';
import type { FormTemplateProps } from '.';



 const FormTemplate: React.FC<FormTemplateProps> = ({
  title,
  sections = [],
  className = "",
  footerActions = []
}) => {


  return (
    <div className={`max-w-7xl mx-auto p-6 overflow-y-auto ${className}`}>
      {title && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 border-b-2 border-blue-500 pb-2 inline-block">
            {title}
          </h1>
        </div>
      )}

      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <FormSection
            key={sectionIndex}
            title={section.title}
            className={section.className}
          >
            <FormGrid cols={section.cols || 2}>
              {section.fields?.map((field, fieldIndex) => {
                const fieldKey = `${sectionIndex}-${fieldIndex}`;

                switch (field.type) {
                  case 'input':

                    return (
                      <div className="flex flex-col" key={fieldKey}>
                        <Label htmlFor={fieldKey} className="block text-sm font-medium text-gray-700 mb-1" required>
                          {field.label}
                        </Label>

                        <Input
                          id={fieldKey}
                          key={fieldKey}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={field.placeholder}
                          type={field.inputType || 'text'}
                          {...field.props}
                        />
                      </div>

                    );

                  case 'select':
                    return (
                      <div className="flex flex-col" key={fieldKey}>

                        <Label htmlFor={fieldKey} className="block text-sm font-medium text-gray-700 mb-1" required>
                          {field.label}
                        </Label>

                        <Select
                          id={fieldKey}
                          key={fieldKey}
                          value={field.value}
                          onChange={field.onSelect}
                          options={field.options || []}
                          {...field.props}
                        />
                      </div>

                    );

                  default:
                    return null;
                }
              })}
            </FormGrid>

            {section.customContent && (
              <div className="mt-4">
                {section.customContent}
              </div>
            )}
          </FormSection>
        ))}

        {footerActions && footerActions.length > 0 && (
          <div className="flex justify-end gap-2 mt-4">
            {footerActions.map((action, idx) => (
              <Button
                key={idx}
                onClick={action.onClick}
                variant={action.variant}
                size='md'
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};


export default FormTemplate;