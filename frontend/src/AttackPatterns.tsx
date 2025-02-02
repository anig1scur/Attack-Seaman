import React from "react";
import {
  List,
  SelectInput,
  SearchInput,
  Filter,
  EditButton,
  Datagrid,
  UrlField,
  TextField,
  BooleanInput,
  Edit,
  SimpleForm,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  Create,
  required
} from "react-admin";

const KillChainName = [
  { kill_chain_name: "mitre-attack" },
  { kill_chain_name: "mitre-ics-attack" },
  { kill_chain_name: "mitre-pre-attack" },
  { kill_chain_name: "mitre-mobile-attack" },
];

const PhaseName = [
  { phase_name: "reconnaissance" },
  { phase_name: "resource-development" },
  { phase_name: "initial-access" },
  { phase_name: "execution" },
  { phase_name: "persistence" },
  { phase_name: "privilege-escalation" },
  { phase_name: "defense-evasion" },
  { phase_name: "credential-access" },
  { phase_name: "discovery" },
  { phase_name: "lateral-movement" },
  { phase_name: "collection" },
  { phase_name: "command-and-control" },
  { phase_name: "exfiltration" },
  { phase_name: "impact" }
];

const AttackPatternFilter = (props: any) => (
  <Filter {...props}>
    <SearchInput source="name" alwaysOn />
  </Filter>
);  

export const AttackPatternList = (props: any) => {
  return (
    
    <List {...props} filters={<AttackPatternFilter />} sort={{ field: 'modified', order: 'DESC'}}>
      <Datagrid>
        <TextField source="name" />
        <TextField
          label="attackID"
          source="external_references[0].external_id"
        />
        <UrlField label="References" source="external_references[0].url" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

const AttackPatternForm = (props: any) => {
  const disabled = !!props.record.id;

  return (
    <SimpleForm warnWhenUnsavedChanges {...props}>
      <TextInput source="type" fullWidth defaultValue='attack-pattern' disabled  />
      <TextInput source="id" fullWidth disabled={disabled} />
      <TextInput source="name" fullWidth validate={required()} />
      <TextInput source="description" fullWidth />

      <ArrayInput source="kill_chain_phases"  validate={required()} >
        <SimpleFormIterator>
          <SelectInput
            source="kill_chain_name"
            label="kill_chain_name"
            choices={KillChainName}
            fullWidth
            optionText="kill_chain_name"
            optionValue="kill_chain_name"
          />
          <SelectInput  source="phase_name"
            label="phase_name"
            choices={PhaseName}
            fullWidth
            optionText="phase_name"
            optionValue="phase_name" />
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput source="external_references" validate={required()} >
        <SimpleFormIterator>
          <TextInput source="source_name" fullWidth label="source_name" />
          <TextInput source="external_id" fullWidth label="external_id" />
          <TextInput source="url" fullWidth label="url" />
        </SimpleFormIterator>
      </ArrayInput>

      <TextInput
        source="x_mitre_version"
        label="x_mitre_version"
        title="x_mitre_version"
        fullWidth
      />
      <TextInput
        source="x_mitre_detection"
        label="x_mitre_detection"
        title="x_mitre_detection"
        fullWidth
      />

      <ArrayInput label="x_mitre_platforms" source="x_mitre_platforms" validate={required()}>
        <SimpleFormIterator>
          <TextInput fullWidth label="x_mitre_platform"/>
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput
        label="x_mitre_permissions_required"
        source="x_mitre_permissions_required"
      >
        <SimpleFormIterator>
          <TextInput fullWidth/>
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput label="x_mitre_data_sources" source="x_mitre_data_sources">
        <SimpleFormIterator>
          <TextInput fullWidth/>
        </SimpleFormIterator>
      </ArrayInput>

      <BooleanInput
        source="x_mitre_is_subtechnique"
        label="x_mitre_is_subtechnique"
        defaultValue={false}
        fullWidth
      />
    </SimpleForm>
  );
};
export const AttackPatternEdit = (props: any) => (
  <Edit title="编辑AttackPattern" {...props}>
    {<AttackPatternForm />}
  </Edit>
);

export const AttackPatternCreate = (props: any) => (
  <Create title="新建一个AttackPattern" {...props}>
    {<AttackPatternForm />}
  </Create>
);
