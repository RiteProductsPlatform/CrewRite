define([], () => {
  'use strict';

  class PageModule {
    getColumnConfigFromPayload(payload) {
      // debugger
      const baseConfig = [
        { "headerText": "Action", "field": "acti", "template": "act" },
        { "headerText": "Employee", "field": "resource_name" },

        { "headerText": "Project", "field": "project_number", "template": "project" },
        { "headerText": "Task", "field": "task", "template": "task" },
        { "headerText": "Date", "field": "date", "template": "date" },
        { "headerText": "Hours", "field": "hours", "template": "hours" },
        { "headerText": "Time Type", "field": "timetype", "template": "timetype" }
      ];
      const uniquePayload = Array.isArray(payload)
        ? payload.filter(
          (item, index, self) =>
            index === self.findIndex(t => t.field_label === item.field_label)
        )
        : [];

      const extraColumns = uniquePayload.map(item => {
        const cleanField = item.field_label.toLowerCase().replace(/\s+/g, "_");
        return {
          headerText: item.field_label,
          field: cleanField,
          template: cleanField
        };
      });

      const merged = [...baseConfig, ...extraColumns].map(col => ({
        ...col,
        template: col.template || col.field
      }));

      return merged;
    }

    constructresponse(data) {
      const result = data.map(item => {
        const key = item.field_label.toLowerCase().replace(/\s+/g, "_");
        return {
          ...item,
          [key]: "", // new key with empty value
          field_label: undefined // optional, to remove
        };
      }).map(({ field_label, ...rest }) => rest);

      return result;

    }

    getVisibleColumns(columns = [], response = []) {
      const nvl = (val, fallback = '') => (val == null ? fallback : val);
      const normalize = str => nvl(str, '').toLowerCase().replace(/[\s_]+/g, '');
      const initCap = str => str
        .split(/[\s_]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const alwaysVisible = [
        "resource_name",
        "project_number",
        "layout_name",
        "field_label",
        "crewsetup_id",
        "crew_name"
      ];

      if (!Array.isArray(columns) || !Array.isArray(response) || response.length === 0) {
        return columns
          .filter(col => alwaysVisible.includes(col.field))
          .map(col => ({
            headerText: col.headerText && col.headerText !== col.field
              ? col.headerText
              : initCap(col.field),
            field: col.field,
            template: col.field
          }));
      }

      const labels = [...new Set(response.map(item => normalize(item.field_label)))];

      const labelFieldMap = {
        "workwage": "attribute3",
        "shift": "attribute1",
        "location": "attribute2"
      };

      const dynamicVisible = labels.map(label => labelFieldMap[label]).filter(Boolean);
      const finalVisibleFields = [...new Set([...alwaysVisible, ...dynamicVisible])];

      return columns
        .filter(col => finalVisibleFields.includes(col.field))
        .map(col => ({
          headerText: col.headerText && col.headerText !== col.field
            ? col.headerText
            : initCap(col.field),
          field: col.field,
          template: col.field
        }));
    }
  }
  PageModule.prototype.getColumns = function(){
    let abc=[];
    return abc = [{'headerText':"Combination","field":"combination","template":"comp"},{'headerText':"Template","field":"template","template":"tmp"}];
  };
 


  return PageModule;
});
