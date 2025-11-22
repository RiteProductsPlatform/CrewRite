define([], () => {
  'use strict';

  class PageModule {
    saveHeader(data) {
      let payload = {
        "p_layout_name": data.layoutname,
        "p_description": data.description,
        "p_layout_type": data.layoutType,
        "p_end_date": "17-Nov-2025",
        "p_start_date": "16-Nov-2086",
        "p_enabled_flag": data.flag
      };
      return payload;
    }
    savelines(data, user, id, header) {
      let payload = {
        "p_layout_id": header.responseid,
        "p_field_sequence": data.sequence,
        "p_field_code": data.field_label,
        "p_field_label": data.field_label,
        "p_field_type": data.field_type,
        "p_data_source": data.field_source,
        "p_field_value": data.field_additionlData,
        "p_is_required": header.flag,
        "p_start_date": "12-Nov-2024",
        "p_end_date": "13-Dec-2025",
        "p_created_by": "John",
        "p_last_updated_by": "John",
        "p_field_mapping":data.field_mapping

      };
      return payload;
    }
  }

  return PageModule;
});
