define([], () => {
  'use strict';

  class PageModule {
  };
  PageModule.prototype.checkMappingValidation = function(data,rowData){
    if(data){
      let isValid = true;
      data.forEach((itm)=>{
        if(itm.mappings === rowData.mappings){
            isValid = false;
        }
      });
      return isValid;
    }

  };

  PageModule.prototype.geneRatePayload = function (userName,header,data) {  
    if (data) {    
      let obj = {
        "p_template_name": header.tempName,      
        "p_description": header.description,
        "p_field_name": data.fieldName,
        "p_field_mapping_attribute": data.mappings,
        "p_created_by":userName,
        "p_last_updated_by":userName      
      };
      return obj;
    }

  };
  
  return PageModule;
});
