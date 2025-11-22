define([
  "knockout",
  "ojs/ojknockout-keyset",
  "ojs/ojarraytreedataprovider",
], function (ko, keySet, ArrayTreeDataProvider) {
  "use strict";
  let navigationMenu = [

    {
      id: "ConfigurationFlow",
      label: "Configuration Flow",
      icon: "",
      node: "parent",
      items: [
        {
          id: "crew_admin",
          label: "Configuration Settings",
          icon: ""

        },
        {
          id: "crew-time-defaults",
          label: "Crew Time Defaults",
          icon: ""

        },
        // {
        //   id: "crew-template",
        //   label: "Crew Template",
        //   icon: "",
        // },
        // {
        //   id: "layout-manager",
        //   label: "Layout Manager",
        //   icon: "",
        // },
        //  {
        //   id: "crew-template-configuration",
        //   label: "Crew Template Configuration",
        //   icon: "",
        // }
      ],
    },
    // {
    //   id: "selfservice",
    //   label: "Self Service",
    //   icon: "book",
    //   node: "parent",
    //   items: [
    //     {
    //       id: "crew-employee-clockin",
    //       label: "Crew Employee Clockin",
    //       icon: "",
    //     },
    //     {
    //       id: "employee-clockin",
    //       label: "Employee Clockin",
    //       icon: "",
    //     }

    //   ],
    // },
    {
      id: "TransactionFlow",
      label: "Transaction Flow",
      icon: "library",
      node: "parent",
      items: [
        {
          id: "crew-setup",
          label: "Crew Definition",
          icon: "",
        },
        {
          id: "crew-time-entry",
          label: "Crew Planned Time sheet",
          icon: "",
        },
           {
          id: "crew-time-entry-approval",
          label: "Crew Time Entry Approval",
          icon: "",
        },
        //  {
        //   id: "time-entry",
        //   label: "Time Entry",
        //   icon: "",
        // },
        // {
        //   id: "crewtime-entry",
        //   label: "Crew Time Entry",
        //   icon: "",
        // },
        // {
        //   id: "crew-time-sheet",
        //   label: "Crew Planned Time sheet New",
        //   icon: "",
        // },
        // {
        //   id: "crew-generate-time-cards",
        //   label: "Generate Time Cards",
        //   icon: "",
        // },
        // {
        //   id: "crew-consolidate-time",
        //   label: "Consolidated Time Approval",
        //   icon: "",
        // },
        // {
        //   id: "crew-equip-schedule",
        //   label: "Crew Schedule",
        //   icon: "",
        // },
      ],
    },
    {
      id: "TimeEntryChannels",
      label: "Time Entry Channels",
      icon: "library",
      node: "parent",
      items: [
        {
          id: "crew-adhoc-timeheet",
          label: "Manual Time Entry",
          icon: "",
        },
        {
          id: "crew-adhoc-combination-timesheet",
          label: "Combination Time Entry",
          icon: "",
        },
        // {
        //   id: "mobileapplication",
        //   label: "Mobile Application",
        //   icon: "",
        // },
        // {
        //   id: "crew-timeentry-consolidated",
        //   label: "Consolidated Time Entry",
        //   icon: "",
        // },

      ],
    },
    {
      id: "Analytics",
      label: "Analytics",
      icon: "book",
      node: "parent",
      items: [
        {
          id: "crew-analytics",
          label: "Crew Analytics",
          icon: "",
        }

      ],
    },
  ];

  class FragmentModule {

    constructor() {
      this.metadata = {
        navigationMenu: navigationMenu,
      };
      this.navlistExpanded = new keySet.ObservableKeySet();
    }
    closeDrawer() {
      document.querySelector('#navDrawer').startOpened = false;
    }

    getMetadata() {
      return this.metadata;
    }

    getNavigationContent(metadata) {
      if (this.navigationContent === undefined) {
        this.navigationContent = ko.observable(
          new ArrayTreeDataProvider(
            this._getNavigationData(metadata.navigationMenu),
            {
              keyAttributes: "attr.id",
            }
          )
        );
      }
      return this.navigationContent;
    }

    _getNavigationData(menu) {
      let navData = [],
        self = this;

      for (let i = 0; i < menu.length; i++) {
        let menuItem = {};
        let origMenuItem = menu[i];
        if (typeof origMenuItem === "object") {
          menuItem.attr = {
            id: origMenuItem.id,
            name: origMenuItem.label,
            icon: origMenuItem.icon,
            badge: origMenuItem.badge,
            node: origMenuItem.node,
          };
        }
        if (origMenuItem.items && origMenuItem.items.length > 0)
          menuItem.children = this._getNavigationData(origMenuItem.items);
        navData.push(menuItem);
      }
      return navData;
    }

    itemSelectable(context) {
      return context.leaf;
    }
  }

  return FragmentModule;
});