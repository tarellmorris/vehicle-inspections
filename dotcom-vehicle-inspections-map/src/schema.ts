import { FIELD_TYPES, FIELD_CATEGORIES } from '@uber/component-common';

export const schema = {
  excludeFromAuthoring: false,
  title: 'Vehicle Inspections Map',
  fields: [
    {
      field: 'heading',
      label: 'Block Heading',
      required: false,
      type: FIELD_TYPES.TEXT_LINE,
      category: FIELD_CATEGORIES.CONTENT,
    },
    {
      field: 'eyebrow',
      label: 'Block Sub Heading',
      required: false,
      type: FIELD_TYPES.TEXT_LINE,
      category: FIELD_CATEGORIES.CONTENT,
    },
    {
      field: 'body',
      label: 'Body Copy',
      required: false,
      type: FIELD_TYPES.MARKDOWN,
      category: FIELD_CATEGORIES.CONTENT,
    },
    {
      field: 'backgroundColor',
      label: 'Background Color',
      required: false,
      type: 'BACKGROUND_COLOR',
      category: FIELD_CATEGORIES.DESIGN,
    },
    {
      field: 'textColor',
      label: 'Text Color',
      required: false,
      type: 'TEXT_COLOR',
      category: FIELD_CATEGORIES.DESIGN,
    },
  ],
};
