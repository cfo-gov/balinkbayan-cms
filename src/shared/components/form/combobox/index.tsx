import { type TExtendedSelect } from '@/shared/types/form';
import DefaultCombobox from './default-combobox';
import { MultiCombobox } from './multi-combobox';

const Combobox = (props: TExtendedSelect) => {
  const { multiple = false, ...selectProps } = props;

  switch (multiple) {
    case true:
      return <MultiCombobox {...selectProps} />;

    default:
      return <DefaultCombobox {...selectProps} />;
  }
};

export default Combobox;
