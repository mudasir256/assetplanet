import React, { Component } from 'react';
import { Icon, Collapse, Timeline, Layout, Steps } from 'antd';

const { Panel } = Collapse;
class GoalsSideBar extends Component {
  componentDidMount() {
    console.log('PROPS ', this.props.currentFormTitle);
  }

  render() {
    const { goalsObject, currentFormTitle, genExtra } = this.props;
    return (
      <React.Fragment>
        {goalsObject &&
        this.props.currentFormTitle === 'Add Child to Family' ? (
          <Collapse expandIconPosition='right'>
            <Panel
              header={`${currentFormTitle}  Information`}
              extra={genExtra('GoalInformationSubForm')}
            >
              <Timeline>
                <Timeline.Item>
                  {'Description of Goal'} :{' '}
                  {goalsObject['GoalInformationSubForm'].goal_description}
                </Timeline.Item>
                <Timeline.Item>
                  {'Education Date'} :{' '}
                  {goalsObject['GoalInformationSubForm'].wedding_date}
                </Timeline.Item>
                <Timeline.Item>
                  {'Goal Assigned To'} :{' '}
                  {goalsObject['GoalInformationSubForm'].goals_assigned_to}
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel
              header={`${currentFormTitle}  Details`}
              extra={genExtra('GoalDetailFormChild')}
            >
              <Timeline>
                {goalsObject['GoalDetailFormChild'].checked === 'natural' ? (
                  <Timeline.Item>
                    {'Natural: $10,000 to $15,000'} :{' '}
                    {goalsObject['GoalDetailFormChild'].natural}
                  </Timeline.Item>
                ) : null}

                {goalsObject['GoalDetailFormChild'].checked === 'adoption' ? (
                  <Timeline.Item>
                    {'Adoption: $8,000 to $40,000'} :{' '}
                    {goalsObject['GoalDetailFormChild'].adoption}
                  </Timeline.Item>
                ) : null}

                {goalsObject['GoalDetailFormChild'].checked === 'fertility' ? (
                  <Timeline.Item>
                    {'Fertility: $22,000 to $75,000'} :{' '}
                    {goalsObject['GoalDetailFormChild'].fertility}
                  </Timeline.Item>
                ) : null}

                <Timeline.Item>
                  {'Inflation Rate for this Goal'} :{' '}
                  {goalsObject['GoalDetailFormChild'].inflation_rate}
                </Timeline.Item>

                <Timeline.Item>
                  {'Amount Needed In Future with Inflation'} :{' '}
                  {goalsObject['GoalDetailFormChild'].amount_needed_in_future}
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel header={`Birth`} extra={genExtra('BirthForm')}>
              <Timeline>
                {goalsObject['BirthForm'].checked === 'home_birth' ? (
                  <Timeline.Item>
                    {'Home Birth'} :{' '}$ {goalsObject['BirthForm'].home_birth ? goalsObject['BirthForm'].home_birth: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['BirthForm'].checked === 'birth_center' ? (
                  <Timeline.Item>
                    {'Birth Center'} :{' '}$ {goalsObject['BirthForm'].birth_center ? goalsObject['BirthForm'].birth_center: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['BirthForm'].checked === 'viginal_birth' ? (
                  <Timeline.Item>
                    {'Viginal Birth with Health Insurance'} :{' '}$
                    {goalsObject['BirthForm'].viginal_birth ? goalsObject['BirthForm'].viginal_birth: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['BirthForm'].checked ===
                'viginal_birth_without' ? (
                  <Timeline.Item>
                    {'Viginal Birth without Health Insurance'} :{' '}$
                    {goalsObject['BirthForm'].viginal_birth_without ? goalsObject['BirthForm'].viginal_birth_without: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['BirthForm'].checked === 'c_section_birth' ? (
                  <Timeline.Item>
                    {'C-Section Birth with Health Insurance'} :{' '}$
                    {goalsObject['BirthForm'].c_section_birth? goalsObject['BirthForm'].c_section_birth: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['BirthForm'].checked ===
                'c_section_birth_without' ? (
                  <Timeline.Item>
                    {'C-Section Birth without Health Insurance'} :{' '}$
                    {goalsObject['BirthForm'].c_section_birth_without ? goalsObject['BirthForm'].c_section_birth_without: 0}
                  </Timeline.Item>
                ) : null}
              </Timeline>
            </Panel>

            <Panel header={`New Arrival`} extra={genExtra('NewArrivalForm')}>
              <Timeline>
                {goalsObject['NewArrivalForm'].crib_mattress_checked ? (
                  <Timeline.Item>
                    {'Crib and Mattress'} :{' '}$
                    {goalsObject['NewArrivalForm'].crib_mattress ? goalsObject['NewArrivalForm'].crib_mattress: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['NewArrivalForm'].bassinet_checked ? (
                  <Timeline.Item>
                    {'Bassinet'} :{' '}$ {goalsObject['NewArrivalForm'].bassinet ? goalsObject['NewArrivalForm'].bassinet: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['NewArrivalForm'].changing_table_checked ? (
                  <Timeline.Item>
                    {'Changing Table'} :{' '}$
                    {goalsObject['NewArrivalForm'].changing_table ? goalsObject['NewArrivalForm'].changing_table: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['NewArrivalForm'].blanket_bedding_checked ? (
                  <Timeline.Item>
                    {'Blankets / Bedding'} :{' '}$
                    {goalsObject['NewArrivalForm'].blanket_bedding ? goalsObject['NewArrivalForm'].blanket_bedding: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['NewArrivalForm'].baby_monitor_checked ? (
                  <Timeline.Item>
                    {'Baby Monitor'} :{' '}$
                    {goalsObject['NewArrivalForm'].baby_monitor? goalsObject['NewArrivalForm'].baby_monitor: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['NewArrivalForm'].rocking_chair_gliding_checked ? (
                  <Timeline.Item>
                    {'Rocking Chair / Gliding'} :{' '}$
                    {goalsObject['NewArrivalForm'].rocking_chair_gliding ? goalsObject['NewArrivalForm'].rocking_chair_gliding: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['NewArrivalForm'].decorations_checked ? (
                  <Timeline.Item>
                    {'Decoration and Other Misc'} :{' '}$
                    {goalsObject['NewArrivalForm'].decorations? goalsObject['NewArrivalForm'].decorations: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['NewArrivalForm'].diaper_pail_checked ? (
                  <Timeline.Item>
                    {'Diaper pail'} :{' '}$
                    {goalsObject['NewArrivalForm'].diaper_pail? goalsObject['NewArrivalForm'].diaper_pail: 0}
                  </Timeline.Item>
                ) : null}

                <Timeline.Item>
                  {'Total'} :{' '}$
                  {goalsObject['NewArrivalForm'].total
                    ? goalsObject['NewArrivalForm'].total
                    : 0}
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel header={`Feeding`} extra={genExtra('FeedingForm')}>
              <Timeline>
                {goalsObject['FeedingForm'].electric_breast_pump_checked ? (
                  <Timeline.Item>
                    {'Electric Breast Pump'} :{' '}$
                    {goalsObject['FeedingForm'].electric_breast_pump? goalsObject['FeedingForm'].electric_breast_pump: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['FeedingForm'].manual_breast_pump_checked ? (
                  <Timeline.Item>
                    {'Manual Breast Pump'} :{' '}$
                    {goalsObject['FeedingForm'].manual_breast_pump ?goalsObject['FeedingForm'].manual_breast_pump: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['FeedingForm'].nursing_pillow_checked ? (
                  <Timeline.Item>
                    {'Nursing Pillow'} :{' '}$
                    {goalsObject['FeedingForm'].nursing_pillow? goalsObject['FeedingForm'].nursing_pillow: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['FeedingForm'].bottle_nipples_brushes_checked ? (
                  <Timeline.Item>
                    {'Bottles, Nipples, and Brushes'} :{' '}$
                    {goalsObject['FeedingForm'].bottle_nipples_brushes? goalsObject['FeedingForm'].bottle_nipples_brushes: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['FeedingForm'].high_chair_checked ? (
                  <Timeline.Item>
                    {'High Chair'} :{' '}$ {goalsObject['FeedingForm'].high_chair? goalsObject['FeedingForm'].high_chair: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['FeedingForm'].bottle_sterillizer_checked ? (
                  <Timeline.Item>
                    {'Bottle Setrillizer'} :{' '}$
                    {goalsObject['FeedingForm'].bottle_sterillizer? goalsObject['FeedingForm'].bottle_sterillizer: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['FeedingForm'].bowls_plates_checked ? (
                  <Timeline.Item>
                    {'Bowls, Plates, Flatware and other misc'} :{' '}$
                    {goalsObject['FeedingForm'].bowls_plates?  goalsObject['FeedingForm'].bowls_plates: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['FeedingForm'].baby_safety_items_checked ? (
                  <Timeline.Item>
                    {'Baby Safety Items (locks, foam, bumpers and etc)'} :{' '}$
                    {goalsObject['FeedingForm'].baby_safety_items ? goalsObject['FeedingForm'].baby_safety_items: 0}
                  </Timeline.Item>
                ) : null}
              </Timeline>

              <Timeline.Item>
                {'Total'} :{' '}
                {goalsObject['FeedingForm'].total
                  ? goalsObject['FeedingForm'].total
                  : 0}
              </Timeline.Item>
            </Panel>

            <Panel
              header={`Bath and Health`}
              extra={genExtra('BathHealthForm')}
            >
              <Timeline>
                {goalsObject['BathHealthForm'].bathtub_checked ? (
                  <Timeline.Item>
                    {'Bathtub'} :{' '}$ {goalsObject['BathHealthForm'].bathtub ? goalsObject['BathHealthForm'].bathtub: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['BathHealthForm'].washcloths_checked ? (
                  <Timeline.Item>
                    {'WashCloths, Hooded Baby Towel, and other misc'} :{' '}$
                    {goalsObject['BathHealthForm'].washcloths ? goalsObject['BathHealthForm'].washcloths: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['BathHealthForm'].forehead_thermometer_checked ? (
                  <Timeline.Item>
                    {'Forehead Thermometer'} :{' '}$
                    {goalsObject['BathHealthForm'].forehead_thermometer? goalsObject['BathHealthForm'].forehead_thermometer: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['BathHealthForm'].humidifier_purifier_checked ? (
                  <Timeline.Item>
                    {'Humidifier / Purifier'} :{' '}$
                    {goalsObject['BathHealthForm'].humidifier_purifier? goalsObject['BathHealthForm'].humidifier_purifier: 0}
                  </Timeline.Item>
                ) : null}

                <Timeline.Item>
                  {'Total'} :{' '}$
                  {goalsObject['BathHealthForm'].total
                    ? goalsObject['BathHealthForm'].total
                    : 0}
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel
              header={`Travel and Transportation`}
              extra={genExtra('TravelTransportationForm')}
            >
              <Timeline>
                {goalsObject['TravelTransportationForm'].car_seat_checked ? (
                  <Timeline.Item>
                    {'Car Seat'} :{' '}$
                    {goalsObject['TravelTransportationForm'].car_seat? goalsObject['TravelTransportationForm'].car_seat: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['TravelTransportationForm'].stroller_checked ? (
                  <Timeline.Item>
                    {'Stroller'} :{' '}$
                    {goalsObject['TravelTransportationForm'].stroller ? goalsObject['TravelTransportationForm'].stroller: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['TravelTransportationForm'].travel_crib_checked ? (
                  <Timeline.Item>
                    {'Travel Crib'} :{' '}$
                    {goalsObject['TravelTransportationForm'].travel_crib ? goalsObject['TravelTransportationForm'].travel_crib: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['TravelTransportationForm']
                  .baby_carrier_checked ? (
                  <Timeline.Item>
                    {'Baby Carrier (ERGO, Boba, Moby, etc)'} :{' '}$
                    {goalsObject['TravelTransportationForm'].baby_carrier ? goalsObject['TravelTransportationForm'].baby_carrier: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['TravelTransportationForm']
                  .family_photo_session_checked ? (
                  <Timeline.Item>
                    {'Familty Photo Session'} :{' '}$
                    {
                      goalsObject['TravelTransportationForm']
                        .family_photo_session ?  goalsObject['TravelTransportationForm']
                        .family_photo_session: 0
                    }
                  </Timeline.Item>
                ) : null}

                <Timeline.Item>
                  {'Total'} :{' '}$
                  {goalsObject['TravelTransportationForm'].total
                    ? goalsObject['TravelTransportationForm'].total
                    : 0}
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel
              header={`Cost Throughout Year`}
              extra={genExtra('CostThroughoutYearForm')}
            >
              <Timeline>
                {goalsObject['CostThroughoutYearForm'].baby_sitter_checked ? (
                  <Timeline.Item>
                    {'Occasionally Baby Sitter'} :{' '}$
                    {goalsObject['CostThroughoutYearForm'].baby_sitter? goalsObject['CostThroughoutYearForm'].baby_sitter: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['CostThroughoutYearForm'].daycare_checked ? (
                  <Timeline.Item>
                    {'Daycare'} :{' '}$
                    {goalsObject['CostThroughoutYearForm'].daycare? goalsObject['CostThroughoutYearForm'].daycare: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['CostThroughoutYearForm']
                  .home_base_daycare_checked ? (
                  <Timeline.Item>
                    {'Home-Base daycare'} :{' '}$
                    {goalsObject['CostThroughoutYearForm'].home_base_daycare? goalsObject['CostThroughoutYearForm'].home_base_daycare: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['CostThroughoutYearForm'].custom_checked ? (
                  <Timeline.Item>
                    {'Custom'} :{' '}$ {goalsObject['CostThroughoutYearForm'].custom? goalsObject['CostThroughoutYearForm'].custom: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['CostThroughoutYearForm']
                  .no_childcare_needed_checked ? (
                  <Timeline.Item>
                    {'No Childcare Needed'} :{' '}$
                    {goalsObject['CostThroughoutYearForm'].no_childcare_needed? goalsObject['CostThroughoutYearForm'].no_childcare_needed: 0}
                  </Timeline.Item>
                ) : null}

                <Timeline.Item>
                  {'Total'} :{' '}$
                  {goalsObject['CostThroughoutYearForm'].total
                    ? goalsObject['CostThroughoutYearForm'].total
                    : 0}
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel
              header={`Additional Cost Throughout Year`}
              extra={genExtra('AddlCostThroughoutYearForm')}
            >
              <Timeline>
                {goalsObject['AddlCostThroughoutYearForm']
                  .disposable_diapers_checked ? (
                  <Timeline.Item>
                    {'Disposable diapers'} :{' '}$
                    {
                      goalsObject['AddlCostThroughoutYearForm']
                        .disposable_diapers ? goalsObject['AddlCostThroughoutYearForm']
                        .disposable_diapers: 0
                    }
                  </Timeline.Item>
                ) : null}

                {goalsObject['AddlCostThroughoutYearForm']
                  .disposible_wipes_checked ? (
                  <Timeline.Item>
                    {'Disposible Wipes'} :{' '}$
                    {goalsObject['AddlCostThroughoutYearForm'].disposible_wipes? goalsObject['AddlCostThroughoutYearForm'].disposible_wipes: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['AddlCostThroughoutYearForm']
                  .formula_feeding_checked ? (
                  <Timeline.Item>
                    {'Formula Feeding (if needed)'} :{' '}$
                    {goalsObject['AddlCostThroughoutYearForm'].formula_feeding ? goalsObject['AddlCostThroughoutYearForm'].formula_feeding: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['AddlCostThroughoutYearForm']
                  .new_clothes_checked ? (
                  <Timeline.Item>
                    {'New Clothes'} :{' '}$
                    {
                      goalsObject['AddlCostThroughoutYearForm']
                        .new_clothes_checked ? goalsObject['AddlCostThroughoutYearForm']
                        .new_clothes_checked: 0
                    }
                  </Timeline.Item>
                ) : null}

                {goalsObject['AddlCostThroughoutYearForm']
                  .second_hand_clothes_checked ? (
                  <Timeline.Item>
                    {'Second-hand clothes'} :{' '}$
                    {
                      goalsObject['AddlCostThroughoutYearForm']
                        .second_hand_clothes ? goalsObject['AddlCostThroughoutYearForm']
                        .second_hand_clothes: 0
                    }
                  </Timeline.Item>
                ) : null}

                {goalsObject['AddlCostThroughoutYearForm']
                  .health_insurance_checked ? (
                  <Timeline.Item>
                    {'Health Insurance'} :{' '}$
                    {goalsObject['AddlCostThroughoutYearForm'].health_insurance? goalsObject['AddlCostThroughoutYearForm'].health_insurance: 0}
                  </Timeline.Item>
                ) : null}

                <Timeline.Item>
                  {'Total'} :{' '}$
                  {goalsObject['AddlCostThroughoutYearForm'].total
                    ? goalsObject['AddlCostThroughoutYearForm'].total
                    : 0}
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel
              header={`Books, Toys and Activities`}
              extra={genExtra('BookToysForm')}
            >
              <Timeline>
                {goalsObject['BookToysForm'].books_checked ? (
                  <Timeline.Item>
                    {'Books'} :{' '}$ {goalsObject['BookToysForm'].books? goalsObject['BookToysForm'].books: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['BookToysForm'].activities_classes_checked ? (
                  <Timeline.Item>
                    {'Activities and Classes'} :{' '}$
                    {goalsObject['BookToysForm'].activities_classes? goalsObject['BookToysForm'].activities_classes: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['BookToysForm'].toys_checked ? (
                  <Timeline.Item>
                    {'Toys'} :{' '}$ {goalsObject['BookToysForm'].toys? goalsObject['BookToysForm'].toys: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['BookToysForm'].additional_checked ? (
                  <Timeline.Item>
                    {'Additional'} :{' '}$ {goalsObject['BookToysForm'].additional? goalsObject['BookToysForm'].additional: 0}
                  </Timeline.Item>
                ) : null}

                <Timeline.Item>
                  {'Total'} :{' '}$
                  {goalsObject['BookToysForm'].total
                    ? goalsObject['BookToysForm'].total
                    : 0}
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel
              header={`Friends and Family`}
              extra={genExtra('FriendsAndFamilyFormBusiness')}
            >
              {goalsObject['FriendsAndFamilyFormBusiness']
                .business_recieved_details &&
              goalsObject['FriendsAndFamilyFormBusiness']
                .business_recieved_details.length > 0 ? (
                <React.Fragment>
                  {goalsObject[
                    'FriendsAndFamilyFormBusiness'
                  ].business_recieved_details.map((item, index) => {
                    return (
                      <Collapse defaultActiveKey='1' key={index}>
                        <Panel
                          header={index + 1}
                          // extra={this.genExtra(subForm.id)}
                        >
                          <Timeline>
                            <Timeline.Item>
                              {'Recipient'} : {item.recipient}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Person Providing Assistance'} :{' '}
                              {item.person_providing_assistance}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Relationship'} : {item.relationship}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Amount Received'} :{' '}$
                              {item.total_amount_of_gifts_recived? item.total_amount_of_gifts_recived: 0}
                            </Timeline.Item>
                          </Timeline>
                        </Panel>
                      </Collapse>
                    );
                  })}
                </React.Fragment>
              ) : (
                ''
              )}
            </Panel>

            <Panel
              header={'Assign Assets'}
              extra={genExtra('QuestionAssignAssetSubForm')}
            >
              {goalsObject['AssetsToGoalSubForm'].asset_to_assign_to_goal &&
              goalsObject['AssetsToGoalSubForm'].asset_to_assign_to_goal
                .length > 0 ? (
                <React.Fragment>
                  {goalsObject[
                    'AssetsToGoalSubForm'
                  ].asset_to_assign_to_goal.map((item, index) => {
                    return (
                      <Collapse defaultActiveKey='1' key={index}>
                        <Panel
                          header={index + 1}
                          // extra={this.genExtra(subForm.id)}
                        >
                          <Timeline>
                            <Timeline.Item>
                              {'Priority'} : {item.priority}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Assets'} : {item.assets}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Value of Asset at Goal Date'} :{' '}
                              {item.value_of_asset_at_goal_date}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Loan Value at Goal Date'} :{' '}
                              {item.loan_value_at_goal_date}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Amount to Use for this Goal'} :{' '}
                              {item.amount_to_use_for_this_goal}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Amount Used in Other Goals'} :{' '}
                              {item.amount_used_in_other_goals}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Taxes'} : {item.taxes}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Net After Tax Applied to Goal'} :{' '}
                              {item.net_after_tax_applied_to_goal}
                            </Timeline.Item>
                          </Timeline>
                        </Panel>
                      </Collapse>
                    );
                  })}
                </React.Fragment>
              ) : (
                ''
              )}
            </Panel>

            <Panel
              header={'Savings'}
              extra={genExtra('QuestionApplySavingSubForm')}
            >
              {goalsObject['AssignSavingsToGoalSubForm']
                .assign_saving_to_goal &&
              goalsObject['AssignSavingsToGoalSubForm'].assign_saving_to_goal
                .length > 0 ? (
                <React.Fragment>
                  {goalsObject[
                    'AssignSavingsToGoalSubForm'
                  ].assign_saving_to_goal.map((item, index) => {
                    return (
                      <Collapse defaultActiveKey='1' key={index}>
                        <Panel
                          header={index + 1}
                          // extra={this.genExtra(subForm.id)}
                        >
                          <Timeline>
                            <Timeline.Item>
                              {'Asset To Assign Goal'} :{' '}
                              {item.asset_to_assign_goal}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Monthly Saving to Assign'} :{' '}$
                              {item.monthly_saving_to_assign? item.monthly_saving_to_assign: 0}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Date to Start Contribution'} :{' '}
                              {item.date_to_start_contribution}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Date to End Contribution'} :{' '}
                              {item.date_to_end_contribution}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Future Value of Asset with Saving'} :{' '}$
                              {item.future_value_of_asset_with_savings? item.future_value_of_asset_with_savings: 0}
                            </Timeline.Item>
                          </Timeline>
                        </Panel>
                      </Collapse>
                    );
                  })}
                </React.Fragment>
              ) : (
                ''
              )}

              <Timeline>
                <Timeline.Item>
                  {'Current Monthly Saving Capacity'} :{' '}$
                  {
                    goalsObject['AssignSavingsToGoalSubForm']
                      .current_monthly_saving_capacity ? goalsObject['AssignSavingsToGoalSubForm']
                      .current_monthly_saving_capacity: 0
                  }
                </Timeline.Item>
                <Timeline.Item>
                  {'Total Monthly Saving'} :{' '}$
                  {
                    goalsObject['AssignSavingsToGoalSubForm']
                      .total_monthly_saving ? goalsObject['AssignSavingsToGoalSubForm']
                      .total_monthly_saving: 0
                  }
                </Timeline.Item>
                <Timeline.Item>
                  {'Monthly Needed to Fund Goal'} :{' '}$
                  {
                    goalsObject['AssignSavingsToGoalSubForm']
                      .monthly_needed_to_fund_goal ? goalsObject['AssignSavingsToGoalSubForm']
                      .monthly_needed_to_fund_goal: 0
                  }
                </Timeline.Item>
                <Timeline.Item>
                  {'Total Saving Including Rate of Return'} :{' '}$
                  {
                    goalsObject['AssignSavingsToGoalSubForm']
                      .monthlySavingstoAssign ? goalsObject['AssignSavingsToGoalSubForm']
                      .monthlySavingstoAssign: 0
                  }
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel header={`Loan`} extra={genExtra('LoanQuestionForm')}>
              <Timeline>
                <Timeline.Item>
                  {'Total Loan Assigned to Goal'} :{' '}$
                  {goalsObject['LoanQuestionForm'].total_loan_assigned_to_goal ? goalsObject['LoanQuestionForm'].total_loan_assigned_to_goal: 0}
                </Timeline.Item>
              </Timeline>
            </Panel>
          </Collapse>
        ) : (
          ''
        )}

        {goalsObject && this.props.currentFormTitle === 'Start a Business' ? (
          <Collapse expandIconPosition='right'>
            <Panel
              header={`${currentFormTitle}  Information`}
              extra={genExtra('GoalInformationSubForm')}
            >
              <Timeline>
                <Timeline.Item>
                  {'Description of Goal'} :{' '}
                  {goalsObject['GoalInformationSubForm'].goal_description}
                </Timeline.Item>
                <Timeline.Item>
                  {'Start a Business Date'} :{' '}
                  {goalsObject['GoalInformationSubForm'].wedding_date}
                </Timeline.Item>
                <Timeline.Item>
                  {'Goal Assigned To'} :{' '}
                  {goalsObject['GoalInformationSubForm'].goals_assigned_to}
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel
              header={`${currentFormTitle}  Details`}
              extra={genExtra('GoalFinancingInformationSubForm')}
            >
              <Timeline>

                <Timeline.Item>
                  {'Inflation Rate for this Goal'} :{' '}
                  {goalsObject['GoalFinancingInformationSubForm'].inflation_rate}
                </Timeline.Item>

                <Timeline.Item>
                  {'Amount Needed In Future with Inflation'} :{' '}
                  {goalsObject['GoalFinancingInformationSubForm'].amount_needed_in_future}
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel
              header={`StartUp Expense - Physical`}
              extra={genExtra('StartupExpenseForm')}
            >
              <Timeline>
                {goalsObject['StartupExpenseForm'].equipment_checked ? (
                  <Timeline.Item>
                    {'Equipment ($5,000 - $150,000)'} :{' '}$
                    {goalsObject['StartupExpenseForm'].equipment ? goalsObject['StartupExpenseForm'].equipment : 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['StartupExpenseForm'].office_space_checked ? (
                  <Timeline.Item>
                    {'Office Space (Monthly $200 - $1,200/ Employee)'} :{' '}$
                    {goalsObject['StartupExpenseForm'].office_space ? goalsObject['StartupExpenseForm'].office_space : 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['StartupExpenseForm'].inventory_checked ? (
                  <Timeline.Item>
                    {'Inventory (Upto 25% of total budget)'} :{' '}$
                    {goalsObject['StartupExpenseForm'].inventory ? goalsObject['StartupExpenseForm'].inventory : 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['StartupExpenseForm'].office_furniture_checked ? (
                  <Timeline.Item>
                    {'Office Furniture and Supplies (10% of total budget)'} :{' '}$
                    {goalsObject['StartupExpenseForm'].office_furniture ? goalsObject['StartupExpenseForm'].office_furniture: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['StartupExpenseForm'].legal_fees_checked ? (
                  <Timeline.Item>
                    {'Legal Fees ($100 - $250)'} :{' '}$
                    {goalsObject['StartupExpenseForm'].legal_fees ? goalsObject['StartupExpenseForm'].legal_fees: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['StartupExpenseForm'].initial_buildout_checked ? (
                  <Timeline.Item>
                    {'Initial Build-Out Costs ($1,000 - $25,000)'} :{' '}$
                    {goalsObject['StartupExpenseForm'].initial_buildout ? goalsObject['StartupExpenseForm'].initial_buildout : 0}
                  </Timeline.Item>
                ) : null}

                <Timeline.Item>
                  {'Total'} :{' '}$
                  {goalsObject['StartupExpenseForm'].total
                    ? goalsObject['StartupExpenseForm'].total
                    : 0}
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel
              header={`Marketing, Professional and Misc`}
              extra={genExtra('MarketingProfessionalandMiscForm')}
            >
              <Timeline>
                {goalsObject['MarketingProfessionalandMiscForm']
                  .marketing_checked ? (
                  <Timeline.Item>
                    {'Marketing (Up to 10% of total budget)'} :{' '}$
                    {goalsObject['MarketingProfessionalandMiscForm'].marketing ? goalsObject['MarketingProfessionalandMiscForm'].marketing : 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['MarketingProfessionalandMiscForm']
                  .website_checked ? (
                  <Timeline.Item>
                    {'Website ($20 - $60/month)'} :{' '}$
                    {goalsObject['MarketingProfessionalandMiscForm'].website ? goalsObject['MarketingProfessionalandMiscForm'].website: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['MarketingProfessionalandMiscForm']
                  .professional_advisor_checked ? (
                  <Timeline.Item>
                    {'Professional Advisors ($100 - $600/month)'} :{' '}$
                    {
                      goalsObject['MarketingProfessionalandMiscForm']
                        .professional_advisor ? goalsObject['MarketingProfessionalandMiscForm']
                        .professional_advisor : 0
                    }
                  </Timeline.Item>
                ) : null}

                {goalsObject['MarketingProfessionalandMiscForm']
                  .travel_checked ? (
                  <Timeline.Item>
                    {'Travel (variable)'} :{' '}$
                    {goalsObject['MarketingProfessionalandMiscForm'].travel ? goalsObject['MarketingProfessionalandMiscForm'].travel: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['MarketingProfessionalandMiscForm']
                  .shipping_checked ? (
                  <Timeline.Item>
                    {'Shipping (variable)'} :{' '}$
                    {goalsObject['MarketingProfessionalandMiscForm'].shipping ? goalsObject['MarketingProfessionalandMiscForm'].shipping: 0}
                  </Timeline.Item>
                ) : null}

                <Timeline.Item>
                  {'Total'} :{' '}$
                  {goalsObject['MarketingProfessionalandMiscForm'].total
                    ? goalsObject['MarketingProfessionalandMiscForm'].total
                    : 0}
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel
              header={`Fees, Taxes and Monthly`}
              extra={genExtra('FeesTaxandMonthlyForm')}
            >
              <Timeline>
                {goalsObject['FeesTaxandMonthlyForm'].taxes_checked ? (
                  <Timeline.Item>
                    {'Taxes (Variable. 21% corporate tax rate for 2020)'} :{' '}$
                    {goalsObject['FeesTaxandMonthlyForm'].taxes ? goalsObject['FeesTaxandMonthlyForm'].taxes : 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['FeesTaxandMonthlyForm'].utilities_checked ? (
                  <Timeline.Item>
                    {'Utilities ($2/square foot of office space)'} :{' '}$
                    {goalsObject['FeesTaxandMonthlyForm'].utilities ? goalsObject['FeesTaxandMonthlyForm'].utilities: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['FeesTaxandMonthlyForm'].payroll_checked ? (
                  <Timeline.Item>
                    {'Payroll (35% - 50% of total budget)'} :{' '}$
                    {goalsObject['FeesTaxandMonthlyForm'].payroll ? goalsObject['FeesTaxandMonthlyForm'].payroll: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['FeesTaxandMonthlyForm'].insurance_checked ? (
                  <Timeline.Item>
                    {'Insurance ($100 - 125/month)'} :{' '}$
                    {goalsObject['FeesTaxandMonthlyForm'].insurance ? goalsObject['FeesTaxandMonthlyForm'].insurance: 0}
                  </Timeline.Item>
                ) : null}

                {goalsObject['FeesTaxandMonthlyForm']
                  .depriciation_scheduled_checked ? (
                  <Timeline.Item>
                    {
                      'Depriciation Schedule for Real Estate (only if property owned)'
                    }{' '}
                    :{' '}$
                    {
                      goalsObject['FeesTaxandMonthlyForm']
                        .depriciation_scheduled ? goalsObject['FeesTaxandMonthlyForm']
                        .depriciation_scheduled : 0
                    }
                  </Timeline.Item>
                ) : null}

                <Timeline.Item>
                  {'Total'} :{' '}$
                  {goalsObject['FeesTaxandMonthlyForm'].total
                    ? goalsObject['FeesTaxandMonthlyForm'].total
                    : 0}
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel
              header={`Operating Expense`}
              extra={genExtra('OperatingExpenseForm')}
            >
              <Timeline>
                <Timeline.Item>
                  {'Payroll'}{' '}$ : {goalsObject['OperatingExpenseForm'].payroll ? goalsObject['OperatingExpenseForm'].payroll : 0}
                </Timeline.Item>
                <Timeline.Item>
                  {'Legal'}{' '}$ : {goalsObject['OperatingExpenseForm'].legal ? goalsObject['OperatingExpenseForm'].legal: 0}
                </Timeline.Item>
                <Timeline.Item>
                  {'Rent / Lease'}{' '}$ :{' '}
                  {goalsObject['OperatingExpenseForm'].rent_lease ? goalsObject['OperatingExpenseForm'].rent_lease: 0}
                </Timeline.Item>

                <Timeline.Item>
                  {'Taxes - Local'}{' '}$ :{' '}
                  {goalsObject['OperatingExpenseForm'].local ?goalsObject['OperatingExpenseForm'].local: 0}
                </Timeline.Item>

                <Timeline.Item>
                  {'Taxes - State'}{' '}$ :{' '}
                  {goalsObject['OperatingExpenseForm'].state ? goalsObject['OperatingExpenseForm'].state: 0}
                </Timeline.Item>

                <Timeline.Item>
                  {'Taxes - Federal'}{' '}$ :{' '}
                  {goalsObject['OperatingExpenseForm'].federal ? goalsObject['OperatingExpenseForm'].federal: 0}
                </Timeline.Item>

                <Timeline.Item>
                  {'Utilities - Supplies'}{' '}$ :{' '}
                  {goalsObject['OperatingExpenseForm'].telecom ? goalsObject['OperatingExpenseForm'].telecom: 0}
                </Timeline.Item>

                <Timeline.Item>
                  {'Utilities - Marketing'}{' '}$ :{' '}
                  {goalsObject['OperatingExpenseForm'].electricity ? goalsObject['OperatingExpenseForm'].electricity: 0}
                </Timeline.Item>

                <Timeline.Item>
                  {'Utilities - Travel'}{' '}$ :{' '}
                  {goalsObject['OperatingExpenseForm'].water ? goalsObject['OperatingExpenseForm'].water: 0}
                </Timeline.Item>

                <Timeline.Item>
                  {'Utilities - Service/Repair'}{' '}$ :{' '}
                  {goalsObject['OperatingExpenseForm'].waste ? goalsObject['OperatingExpenseForm'].waste: 0}
                </Timeline.Item>

                <Timeline.Item>
                  {'Utilities - Outside Contractor'} :{' '}$
                  {goalsObject['OperatingExpenseForm'].gas ? goalsObject['OperatingExpenseForm'].gas: 0}
                </Timeline.Item>

                <Timeline.Item>
                  {'Utilities - Other'} :{' '}$
                  {goalsObject['OperatingExpenseForm'].other ? goalsObject['OperatingExpenseForm'].other: 0}
                </Timeline.Item>

                <Timeline.Item>
                  {'Supplies'}{' '}$ : {goalsObject['OperatingExpenseForm'].supplies ? goalsObject['OperatingExpenseForm'].supplies: 0}
                </Timeline.Item>
                <Timeline.Item>
                  {'Marketing'} :{' '}$
                  {goalsObject['OperatingExpenseForm'].marketing ? goalsObject['OperatingExpenseForm'].marketing: 0}
                </Timeline.Item>
                <Timeline.Item>
                  {'Travel'}{' '}$ : {goalsObject['OperatingExpenseForm'].travel ? goalsObject['OperatingExpenseForm'].travel: 0}
                </Timeline.Item>
                <Timeline.Item>
                  {'Service / Repairs'} :{' '}$
                  {goalsObject['OperatingExpenseForm'].service_repairs ? goalsObject['OperatingExpenseForm'].service_repairs: 0}
                </Timeline.Item>
                <Timeline.Item>
                  {'Outside Contractors'} :{' '}$
                  {goalsObject['OperatingExpenseForm'].outside_contractors ? goalsObject['OperatingExpenseForm'].outside_contractors: 0}
                </Timeline.Item>
                <Timeline.Item>
                  {'Other'}{' '}$ : {goalsObject['OperatingExpenseForm'].Other ? goalsObject['OperatingExpenseForm'].Other: 0}
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel header={`Revenue`} extra={genExtra('RevenueForm')}>
              <Timeline>
                <Timeline.Item>
                  {'Initial Gross Revenue Year 1'} :{' '}$
                  {goalsObject['RevenueForm'].inital_gross_revenue ? goalsObject['RevenueForm'].inital_gross_revenue: 0}
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel header={`Valuation`} extra={genExtra('ValuationForm')}>
              <Timeline>
                <Timeline.Item>
                  {'Business Valuation'} :{' '}
                  {goalsObject['ValuationForm'].business_valuation}
                </Timeline.Item>
                <Timeline.Item>
                  {'Valuation Multiplier'} :{' '}
                  {goalsObject['ValuationForm'].valuation_multiplier}
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel
                header={'Est. Profit and Loss'}
                extra={genExtra('EstimatedProfitOrLossForm')}
              >
                {goalsObject['EstimatedProfitOrLossForm'].estimated_profit_loss &&
                goalsObject['EstimatedProfitOrLossForm'].estimated_profit_loss.length >
                  0 ? (
                  <React.Fragment>
                    {goalsObject['EstimatedProfitOrLossForm'].estimated_profit_loss.map(
                      (item, index) => {
                        return (
                          <Collapse defaultActiveKey='1' key={index}>
                            <Panel header={index + 1}>
                              <Timeline>
                                <Timeline.Item>
                                  {'Year'} :{' '}
                                  {item.year}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Costs'} : {item.costs}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Gross Revenue'} : {item.gross_revenue}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Top Line Revenue Growth Rate'} : {item.top_line_revenue}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Profitability %'} : {item.profitability_percent}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Profitability $'} : {item.profitability_currency}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'If Loss, Does Corp Retain Loss or Passthrough to Individual'} : {item.retain_loss}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Estimated Value of Business'} : {item.estimated_value_business}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Profits Added to Personal Income'} : {item.personal_income}
                                </Timeline.Item>
                              </Timeline>
                            </Panel>
                          </Collapse>
                        );
                      }
                    )}
                  </React.Fragment>
                ) : (
                  ''
                )}
              </Panel>

            <Panel
              header={`Profit and Loss`}
              extra={genExtra('ProfitandLossForm')}
            >
              <Timeline>
                <Timeline.Item>
                  {'Estimated Breakeven Date'} :{' '}
                  {goalsObject['ProfitandLossForm'].estimated_breakeven_date}
                </Timeline.Item>
                <Timeline.Item>
                  {'Source of Loss Reserve'} :{' '}
                  {goalsObject['ProfitandLossForm'].source_of_loss_reserve}
                </Timeline.Item>
                <Timeline.Item>
                  {'Define Growth Rate for Years 11 to End of Plan'} :{' '}
                  {goalsObject['ProfitandLossForm'].define_growth_rate}
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel
              header={`Friends and Family`}
              extra={genExtra('FriendsAndFamilyFormBusiness')}
            >
              {goalsObject['FriendsAndFamilyFormBusiness']
                .business_recieved_details &&
              goalsObject['FriendsAndFamilyFormBusiness']
                .business_recieved_details.length > 0 ? (
                <React.Fragment>
                  {goalsObject[
                    'FriendsAndFamilyFormBusiness'
                  ].business_recieved_details.map((item, index) => {
                    return (
                      <Collapse defaultActiveKey='1' key={index}>
                        <Panel
                          header={index + 1}
                          // extra={this.genExtra(subForm.id)}
                        >
                          <Timeline>
                            <Timeline.Item>
                              {'Recipient'} : {item.recipient}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Person Providing Assistance'} :{' '}
                              {item.person_providing_assistance}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Relationship'} : {item.relationship}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Amount Received'} :{' '}$
                              {item.total_amount_of_gifts_recived ? item.total_amount_of_gifts_recived : 0}
                            </Timeline.Item>
                          </Timeline>
                        </Panel>
                      </Collapse>
                    );
                  })}
                </React.Fragment>
              ) : (
                ''
              )}
            </Panel>

            <Panel
              header={'Assign Assets'}
              extra={genExtra('QuestionAssignAssetSubForm')}
            >
              {goalsObject['AssetsToGoalSubForm'].asset_to_assign_to_goal &&
              goalsObject['AssetsToGoalSubForm'].asset_to_assign_to_goal
                .length > 0 ? (
                <React.Fragment>
                  {goalsObject[
                    'AssetsToGoalSubForm'
                  ].asset_to_assign_to_goal.map((item, index) => {
                    return (
                      <Collapse defaultActiveKey='1' key={index}>
                        <Panel
                          header={index + 1}
                          // extra={this.genExtra(subForm.id)}
                        >
                          <Timeline>
                            <Timeline.Item>
                              {'Priority'} : {item.priority}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Assets'} : {item.assets}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Value of Asset at Goal Date'} :{' '}
                              {item.value_of_asset_at_goal_date}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Loan Value at Goal Date'} :{' '}
                              {item.loan_value_at_goal_date}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Amount to Use for this Goal'} :{' '}
                              {item.amount_to_use_for_this_goal}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Amount Used in Other Goals'} :{' '}
                              {item.amount_used_in_other_goals}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Taxes'} : {item.taxes}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Net After Tax Applied to Goal'} :{' '}
                              {item.net_after_tax_applied_to_goal}
                            </Timeline.Item>
                          </Timeline>
                        </Panel>
                      </Collapse>
                    );
                  })}
                </React.Fragment>
              ) : (
                ''
              )}
            </Panel>

            <Panel
              header={'Savings'}
              extra={genExtra('QuestionApplySavingSubForm')}
            >
              {goalsObject['AssignSavingsToGoalSubForm']
                .assign_saving_to_goal &&
              goalsObject['AssignSavingsToGoalSubForm'].assign_saving_to_goal
                .length > 0 ? (
                <React.Fragment>
                  {goalsObject[
                    'AssignSavingsToGoalSubForm'
                  ].assign_saving_to_goal.map((item, index) => {
                    return (
                      <Collapse defaultActiveKey='1' key={index}>
                        <Panel
                          header={index + 1}
                          // extra={this.genExtra(subForm.id)}
                        >
                          <Timeline>
                            <Timeline.Item>
                              {'Asset To Assign Goal'} :{' '}
                              {item.asset_to_assign_goal}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Monthly Saving to Assign'} :{' '}$
                              {item.monthly_saving_to_assign ? item.monthly_saving_to_assign : 0}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Date to Start Contribution'} :{' '}
                              {item.date_to_start_contribution}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Date to End Contribution'} :{' '}
                              {item.date_to_end_contribution}
                            </Timeline.Item>
                            <Timeline.Item>
                              {'Future Value of Asset with Saving'} :{' '}$
                              {item.future_value_of_asset_with_savings ?item.future_value_of_asset_with_savings: 0}
                            </Timeline.Item>
                          </Timeline>
                        </Panel>
                      </Collapse>
                    );
                  })}
                </React.Fragment>
              ) : (
                ''
              )}

              <Timeline>
                <Timeline.Item>
                  {'Current Monthly Saving Capacity'} :{' '}$
                  {
                    goalsObject['AssignSavingsToGoalSubForm']
                      .current_monthly_saving_capacity ? goalsObject['AssignSavingsToGoalSubForm']
                      .current_monthly_saving_capacity: 0
                  }
                </Timeline.Item>
                <Timeline.Item>
                  {'Total Monthly Saving'} :{' '}$
                  {
                    goalsObject['AssignSavingsToGoalSubForm']
                      .total_monthly_saving ? goalsObject['AssignSavingsToGoalSubForm']
                      .total_monthly_saving: 0
                  }
                </Timeline.Item>
                <Timeline.Item>
                  {'Monthly Needed to Fund Goal'} :{' '}$
                  {
                    goalsObject['AssignSavingsToGoalSubForm']
                      .monthly_needed_to_fund_goal ? goalsObject['AssignSavingsToGoalSubForm']
                      .monthly_needed_to_fund_goal: 0
                  }
                </Timeline.Item>
                <Timeline.Item>
                  {'Total Saving Including Rate of Return'} :{' '}$
                  {
                    goalsObject['AssignSavingsToGoalSubForm']
                      .monthlySavingstoAssign ?  goalsObject['AssignSavingsToGoalSubForm']
                      .monthlySavingstoAssign: 0
                  }
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel header={`Loan`} extra={genExtra('LoanQuestionForm')}>
              <Timeline>
                <Timeline.Item>
                  {'Total Loan Assigned to Goal'} :{' '}$
                  {goalsObject['LoanQuestionForm'].total_loan_assigned_to_goal ? goalsObject['LoanQuestionForm'].total_loan_assigned_to_goal: 0}
                </Timeline.Item>
              </Timeline>
            </Panel>
          </Collapse>
        ) : (
          ''
        )}

        {goalsObject && this.props.currentFormTitle === 'Private Education' ? (
          <Collapse expandIconPosition='right'>
            <Panel
              header={`${currentFormTitle}  Information`}
              extra={genExtra('GoalInformationSubForm')}
            >
              <Timeline>
                <Timeline.Item>
                  {'Description of Goal'} :{' '}
                  {goalsObject['GoalInformationSubForm'].goal_description}
                </Timeline.Item>
                <Timeline.Item>
                  {'Education Date'} :{' '}
                  {goalsObject['GoalInformationSubForm'].wedding_date}
                </Timeline.Item>
                <Timeline.Item>
                  {'Goal Assigned To'} :{' '}
                  {goalsObject['GoalInformationSubForm'].goals_assigned_to}
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel
              header={`Education Details`}
              extra={genExtra('PrivateEducationDetails')}
            >
              <Timeline>
                <Timeline.Item>
                  {'Person Attending School'} :{' '}
                  {
                    goalsObject['PrivateEducationDetails']
                      .person_attending_school
                  }
                </Timeline.Item>
                <Timeline.Item>
                  {'Name of Institution'} :{' '}
                  {goalsObject['PrivateEducationDetails'].name_of_institution}
                </Timeline.Item>
                <Timeline.Item>
                  {'Level of Education'} :{' '}
                  {goalsObject['PrivateEducationDetails'].level_of_education}
                </Timeline.Item>
                <Timeline.Item>
                  {'For How Many Years'} :{' '}
                  {goalsObject['PrivateEducationDetails'].how_many_years}
                </Timeline.Item>
                <Timeline.Item>
                  {'Estimated Annual Tuition Cost'} :{' '}
                  {
                    goalsObject['PrivateEducationDetails']
                      .estimated_annual_tution_cost
                  }
                </Timeline.Item>
                <Timeline.Item>
                  {'Inflation Rate'} :{' '}
                  {goalsObject['PrivateEducationDetails'].inflation_rate}
                </Timeline.Item>
              </Timeline>
            </Panel>

            <Panel
              header={`Room, Board, Misc`}
              extra={genExtra('RoomBoardMiscSubForm')}
            >
              <Timeline>
                <Timeline.Item>
                  {'Text Book and School Supplies'} :{' '}
                  {
                    goalsObject['RoomBoardMiscSubForm']
                      .text_book_and_school_supplies
                  }
                </Timeline.Item>
                <Timeline.Item>
                  {'Transportation'} :{' '}
                  {goalsObject['RoomBoardMiscSubForm'].trasportation}
                </Timeline.Item>
                <Timeline.Item>
                  {'Equipment'} :{' '}
                  {goalsObject['RoomBoardMiscSubForm'].equipment}
                </Timeline.Item>
                <Timeline.Item>
                  {'School and Activity Fees'} :{' '}
                  {goalsObject['RoomBoardMiscSubForm'].school_and_activity_fees}
                </Timeline.Item>
                <Timeline.Item>
                  {'Personal Expenses'} :{' '}
                  {goalsObject['RoomBoardMiscSubForm'].personal_expenses}
                </Timeline.Item>
                <Timeline.Item>
                  {'Estimated Housing'} :{' '}
                  {goalsObject['RoomBoardMiscSubForm'].estimated_housing}
                </Timeline.Item>
                <Timeline.Item>
                  {'Estimated Meal Plan'} :{' '}
                  {goalsObject['RoomBoardMiscSubForm'].estimated_meal_plan}
                </Timeline.Item>
                <Timeline.Item>
                  {'Inflation Rate'} :{' '}
                  {goalsObject['RoomBoardMiscSubForm'].inflation_rate}
                </Timeline.Item>
              </Timeline>
            </Panel>

            {this.props.goalsObject['FundingSourcesForm'] &&
            this.props.goalsObject['FundingSourcesForm'][
              'FriendsandFamilyForm'
            ] &&
            this.props.goalsObject['FundingSourcesForm'][
              'FriendsandFamilyForm_rad'
            ] === 'yes' ? (
              <Panel
                header={'Friends and Family (Multiple Payment)'}
                extra={genExtra('FriendsandFamilyForm')}
              >
                {goalsObject['FriendsandFamilyForm'].multiple_times &&
                goalsObject['FriendsandFamilyForm'].multiple_times.length >
                  0 ? (
                  <React.Fragment>
                    {goalsObject['FriendsandFamilyForm'].multiple_times.map(
                      (item, index) => {
                        return (
                          <Collapse defaultActiveKey='1' key={index}>
                            <Panel header={index + 1}>
                              <Timeline>
                                <Timeline.Item>
                                  {'Person Providing Assitance'} :{' '}
                                  {item.person_providing_assistance}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Relationship'} : {item.relationship}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'What are these Funds For'} : {item.funds}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Amount'} : {item.amount}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Frequency'} : {item.frequency}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Start Date'} : {item.start_date}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'End Date'} : {item.end_date}
                                </Timeline.Item>
                              </Timeline>
                            </Panel>
                          </Collapse>
                        );
                      }
                    )}
                  </React.Fragment>
                ) : (
                  ''
                )}
              </Panel>
            ) : (
              ''
            )}

            {this.props.goalsObject['FundingSourcesForm'] &&
            this.props.goalsObject['FundingSourcesForm'][
              'FriendsandFamilyForm'
            ] &&
            this.props.goalsObject['FundingSourcesForm'][
              'FriendsandFamilyForm_rad'
            ] === 'yes' ? (
              <Panel
                header={'Friends and Family (One-Time Payment)'}
                extra={genExtra('FriendsandFamilyForm')}
              >
                {goalsObject['FriendsandFamilyForm'].single_time &&
                goalsObject['FriendsandFamilyForm'].single_time.length > 0 ? (
                  <React.Fragment>
                    {goalsObject['FriendsandFamilyForm'].single_time.map(
                      (item, index) => {
                        return (
                          <Collapse defaultActiveKey='1' key={index}>
                            <Panel header={index + 1}>
                              <Timeline>
                                <Timeline.Item>
                                  {'Person Providing Assitance'} :{' '}
                                  {item.person_providing_assistance}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Relationship'} : {item.relationship}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'What are these Funds For'} : {item.funds}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Amount'} : {item.amount}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Date'} : {item.date}
                                </Timeline.Item>
                              </Timeline>
                            </Panel>
                          </Collapse>
                        );
                      }
                    )}
                  </React.Fragment>
                ) : (
                  ''
                )}
              </Panel>
            ) : (
              ''
            )}

            {this.props.goalsObject['FundingSourcesForm'] &&
            this.props.goalsObject['FundingSourcesForm'][
              'ContributionSavingForm'
            ] &&
            this.props.goalsObject['FundingSourcesForm'][
              'ContributionSavingForm_rad'
            ] === 'yes' ? (
              <Panel
                header={'Contributions / Savings'}
                extra={genExtra('ContributionSavingForm')}
              >
                {goalsObject['ContributionSavingForm'].contribution_saving &&
                goalsObject['ContributionSavingForm'].contribution_saving
                  .length > 0 ? (
                  <React.Fragment>
                    {goalsObject[
                      'ContributionSavingForm'
                    ].contribution_saving.map((item, index) => {
                      return (
                        <Collapse defaultActiveKey='1' key={index}>
                          <Panel
                            header={index + 1}
                            // extra={this.genExtra(subForm.id)}
                          >
                            <Timeline>
                              <Timeline.Item>
                                {'Type of Account'} : {item.type_of_account}
                              </Timeline.Item>
                              <Timeline.Item>
                                {'Amount Needed to Save'} :{' '}
                                {item.amount_needed_for_goal}
                              </Timeline.Item>
                              <Timeline.Item>
                                {'Monthly Saving to Assign'} :{' '}
                                {item.monthly_saving_to_assign}
                              </Timeline.Item>
                              <Timeline.Item>
                                {'Date to Start Contribution'} :{' '}
                                {item.date_to_start_contribution}
                              </Timeline.Item>
                              <Timeline.Item>
                                {'Date to End Contribution'} :{' '}
                                {item.date_to_end_contribution}
                              </Timeline.Item>
                            </Timeline>
                          </Panel>
                        </Collapse>
                      );
                    })}
                  </React.Fragment>
                ) : (
                  ''
                )}
              </Panel>
            ) : (
              ''
            )}

            {this.props.goalsObject['FundingSourcesForm'] &&
            this.props.goalsObject['FundingSourcesForm']['StudentLoanForm'] &&
            this.props.goalsObject['FundingSourcesForm'][
              'StudentLoanForm_rad'
            ] === 'yes' ? (
              <Panel
                header={'Student Loans (Federal)'}
                extra={genExtra('StudentLoanForm')}
              >
                {goalsObject['StudentLoanForm'].federal_loans &&
                goalsObject['StudentLoanForm'].federal_loans.length > 0 ? (
                  <React.Fragment>
                    {goalsObject['StudentLoanForm'].federal_loans.map(
                      (item, index) => {
                        return (
                          <Collapse defaultActiveKey='1' key={index}>
                            <Panel header={index + 1}>
                              <Timeline>
                                <Timeline.Item>
                                  {'Nick Name of Loan'} : {item.loan_nickname}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Amount'} : {item.amount}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'APR'} : {item.apr}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Federal Loans'} : {item.federal_loans}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Cosigner'} : {item.cosigner}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'First Payment Due'} :{' '}
                                  {item.first_payment_due}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Amount of Payment'} :{' '}
                                  {item.amount_of_payment}
                                </Timeline.Item>
                              </Timeline>
                            </Panel>
                          </Collapse>
                        );
                      }
                    )}
                  </React.Fragment>
                ) : (
                  ''
                )}
              </Panel>
            ) : (
              ''
            )}

            {this.props.goalsObject['FundingSourcesForm'] &&
            this.props.goalsObject['FundingSourcesForm']['StudentLoanForm'] &&
            this.props.goalsObject['FundingSourcesForm'][
              'StudentLoanForm_rad'
            ] === 'yes' ? (
              <Panel
                header={'Student Loans (Private)'}
                extra={genExtra('StudentLoanForm')}
              >
                {goalsObject['StudentLoanForm'].private_loans &&
                goalsObject['StudentLoanForm'].private_loans.length > 0 ? (
                  <React.Fragment>
                    {goalsObject['StudentLoanForm'].private_loans.map(
                      (item, index) => {
                        return (
                          <Collapse defaultActiveKey='1' key={index}>
                            <Panel header={index + 1}>
                              <Timeline>
                                <Timeline.Item>
                                  {'Nick Name of Loan'} : {item.loan_nickname}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Amount'} : {item.amount}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'APR'} : {item.apr}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Cosigner'} : {item.cosigner}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'First Payment Due'} :{' '}
                                  {item.first_payment_due}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Amount of Payment'} :{' '}
                                  {item.amount_of_payment}
                                </Timeline.Item>
                              </Timeline>
                            </Panel>
                          </Collapse>
                        );
                      }
                    )}
                  </React.Fragment>
                ) : (
                  ''
                )}
              </Panel>
            ) : (
              ''
            )}

            {this.props.goalsObject['FundingSourcesForm'] &&
            this.props.goalsObject['FundingSourcesForm'][
              'ScholarshopAndGrantForm'
            ] &&
            this.props.goalsObject['FundingSourcesForm'][
              'ScholarshopAndGrantForm_rad'
            ] === 'yes' ? (
              <Panel
                header={'Scholarship / Grant'}
                extra={genExtra('ScholarshopAndGrantForm')}
              >
                {goalsObject['ScholarshopAndGrantForm'].scholarship_and_grant &&
                goalsObject['ScholarshopAndGrantForm'].scholarship_and_grant
                  .length > 0 ? (
                  <React.Fragment>
                    {goalsObject[
                      'ScholarshopAndGrantForm'
                    ].scholarship_and_grant.map((item, index) => {
                      return (
                        <Collapse defaultActiveKey='1' key={index}>
                          <Panel
                            header={index + 1}
                            // extra={this.genExtra(subForm.id)}
                          >
                            <Timeline>
                              <Timeline.Item>
                                {'Type of Assistance'} :{' '}
                                {item.type_of_assistance}
                              </Timeline.Item>
                              <Timeline.Item>
                                {'Nickname of Scholarship / Grant'} :{' '}
                                {item.nick_name}
                              </Timeline.Item>
                              <Timeline.Item>
                                {'Amount'} : {item.amount}
                              </Timeline.Item>
                              <Timeline.Item>
                                {'This Gift Aid can Be Used For'} :{' '}
                                {item.gift_aid}
                              </Timeline.Item>
                            </Timeline>
                          </Panel>
                        </Collapse>
                      );
                    })}
                  </React.Fragment>
                ) : (
                  ''
                )}
              </Panel>
            ) : (
              ''
            )}

            {this.props.goalsObject['FundingSourcesForm'] &&
            this.props.goalsObject['FundingSourcesForm'][
              'PersonalLoanHelocForm'
            ] &&
            this.props.goalsObject['FundingSourcesForm'][
              'PersonalLoanHelocForm_rad'
            ] === 'yes' ? (
              <Panel
                header={'Personal Loan / HELOC (Parent PLUS Loan)'}
                extra={genExtra('PersonalLoanHelocForm')}
              >
                {goalsObject['PersonalLoanHelocForm'].parent_plus_loan &&
                goalsObject['PersonalLoanHelocForm'].parent_plus_loan.length >
                  0 ? (
                  <React.Fragment>
                    {goalsObject['PersonalLoanHelocForm'].parent_plus_loan.map(
                      (item, index) => {
                        return (
                          <Collapse defaultActiveKey='1' key={index}>
                            <Panel
                              header={index + 1}
                              // extra={this.genExtra(subForm.id)}
                            >
                              <Timeline>
                                <Timeline.Item>
                                  {'Initial Loan Amount'} :{' '}
                                  {item.initial_loan_amount}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Start Date'} : {item.start_date}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Monthly Payment'} : {item.monthly_payment}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Origination Fee'} : {item.origination_fee}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Interest Rate (or APR%)'} :{' '}
                                  {item.interest_rate}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Name of Financial Institution'} :{' '}
                                  {item.name_financial_institution}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Account Number'} : {item.account_number}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Number of Years for Repayment Plan'} :{' '}
                                  {item.replacement_plan}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Deferring Payment Until Graduation'} :{' '}
                                  {item.deferring_payment}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Interest Only Until Graduation'} :{' '}
                                  {item.interested_only_graduation}
                                </Timeline.Item>
                              </Timeline>
                            </Panel>
                          </Collapse>
                        );
                      }
                    )}
                  </React.Fragment>
                ) : (
                  ''
                )}
              </Panel>
            ) : (
              ''
            )}

            {this.props.goalsObject['FundingSourcesForm'] &&
            this.props.goalsObject['FundingSourcesForm'][
              'PersonalLoanHelocForm'
            ] &&
            this.props.goalsObject['FundingSourcesForm'][
              'PersonalLoanHelocForm_rad'
            ] === 'yes' ? (
              <Panel
                header={'Personal Loan / HELOC (Personal Loan)'}
                extra={genExtra('PersonalLoanHelocForm')}
              >
                {goalsObject['PersonalLoanHelocForm'].personal_loans &&
                goalsObject['PersonalLoanHelocForm'].personal_loans.length >
                  0 ? (
                  <React.Fragment>
                    {goalsObject['PersonalLoanHelocForm'].personal_loans.map(
                      (item, index) => {
                        return (
                          <Collapse defaultActiveKey='1' key={index}>
                            <Panel
                              header={index + 1}
                              // extra={this.genExtra(subForm.id)}
                            >
                              <Timeline>
                                <Timeline.Item>
                                  {'Initial Loan Amount'} :{' '}
                                  {item.initial_loan_amount}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Start Date'} : {item.start_date}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Maturity Date'} : {item.maturity_date}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Interest Rate (or APR%)'} : {item.apr}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Monthly Payment'} : {item.monthly_payment}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Name of Financial Institution'} :{' '}
                                  {item.name_financial_institution}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Account Number'} : {item.account_number}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Length of Loan'} : {item.length_of_loan}
                                </Timeline.Item>
                              </Timeline>
                            </Panel>
                          </Collapse>
                        );
                      }
                    )}
                  </React.Fragment>
                ) : (
                  ''
                )}
              </Panel>
            ) : (
              ''
            )}

            {this.props.goalsObject['FundingSourcesForm'] &&
            this.props.goalsObject['FundingSourcesForm'][
              'AssigningAssetForm'
            ] &&
            this.props.goalsObject['FundingSourcesForm'][
              'AssigningAssetForm_rad'
            ] === 'yes' ? (
              <Panel
                header={`Assign an Asset`}
                extra={genExtra('AssigningAssetForm')}
              >
                <Timeline>
                  <Timeline.Item>
                    {'Amount Needed in Future For Inflation'} :{' '}
                    {/* {goalsObject['PrivateEducationDetails'].person_attending_school} */}
                  </Timeline.Item>
                  <Timeline.Item>
                    {'Current Saved for Goal'} :{' '}
                    {/* {goalsObject['PrivateEducationDetails'].name_of_institution} */}
                  </Timeline.Item>
                  <Timeline.Item>
                    {'Percent Goal Success'} :{' '}
                    {/* {goalsObject['PrivateEducationDetails'].level_of_education} */}
                  </Timeline.Item>
                  <Timeline.Item>
                    {'Total Value of Asset Applied'} :{' '}
                    {/* {goalsObject['PrivateEducationDetails'].how_many_years} */}
                  </Timeline.Item>
                </Timeline>
              </Panel>
            ) : (
              ''
            )}

            {this.props.goalsObject['FundingSourcesForm'] &&
            this.props.goalsObject['FundingSourcesForm']['WorkStudyForm'] &&
            this.props.goalsObject['FundingSourcesForm'][
              'WorkStudyForm_rad'
            ] === 'yes' ? (
              <Panel header={'Work Study'} extra={genExtra('WorkStudyForm')}>
                {goalsObject['WorkStudyForm'].work_study &&
                goalsObject['WorkStudyForm'].work_study.length > 0 ? (
                  <React.Fragment>
                    {goalsObject['WorkStudyForm'].work_study.map(
                      (item, index) => {
                        return (
                          <Collapse defaultActiveKey='1' key={index}>
                            <Panel
                              header={index + 1}
                              // extra={this.genExtra(subForm.id)}
                            >
                              <Timeline>
                                <Timeline.Item>
                                  {'Amount Allocated for Work Study'} :{' '}
                                  {item.amount_allocated_to_work_study}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Name of Business'} : {item.name_of_business}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'Job Title'} : {item.job_title}
                                </Timeline.Item>
                                <Timeline.Item>
                                  {'On Campus or Off Campus'} :{' '}
                                  {item.on_off_campus}
                                </Timeline.Item>
                              </Timeline>
                            </Panel>
                          </Collapse>
                        );
                      }
                    )}
                  </React.Fragment>
                ) : (
                  ''
                )}
              </Panel>
            ) : (
              ''
            )}
          </Collapse>
        ) : (
          ''
        )}
      </React.Fragment>
    );
  }
}

export default GoalsSideBar;

// <React.Fragment>
//   <Panel
//     header={`${currentFormTitle}  Information`}
//     extra={genExtra('GoalInformationSubForm')}
//   >
//     <Timeline>
//       <Timeline.Item>
//         {'Description of Goal'} :{' '}
//         {goalsObject['GoalInformationSubForm'].goal_description}
//       </Timeline.Item>
//       <Timeline.Item>
//         {'Wedding Date'} :{' '}
//         {goalsObject['GoalInformationSubForm'].wedding_date}
//       </Timeline.Item>
//       <Timeline.Item>
//         {'Goal Assigned To'} :{' '}
//         {goalsObject['GoalInformationSubForm'].goals_assigned_to}
//       </Timeline.Item>
//     </Timeline>
//   </Panel>

//   <Panel
//     header={`${currentFormTitle}  Details`}
//     extra={genExtra('GoalFinancingInformationSubForm')}
//   >
//     <Timeline>
//       <Timeline.Item>
//         {'Moving To'} :{' '}
//         {goalsObject['GoalFinancingInformationSubForm'].moving_to}
//       </Timeline.Item>

//       <Timeline.Item>
//         {'Moving Cost'} :{' '}
//         {goalsObject['GoalFinancingInformationSubForm'].moving_cost}
//       </Timeline.Item>

//       <Timeline.Item>
//         {'Dollar Amount Needed'} :{' '}
//         {
//           goalsObject['GoalFinancingInformationSubForm']
//             .dollar_amount_needed
//         }
//       </Timeline.Item>
//       <Timeline.Item>
//         {'Inflation Rate for this Goal'} :{' '}
//         {
//           goalsObject['GoalFinancingInformationSubForm']
//             .inflation_rate
//         }
//       </Timeline.Item>
//       <Timeline.Item>
//         {'Amount Needed in Future with Inflation'} :{' '}
//         {
//           goalsObject['GoalFinancingInformationSubForm']
//             .amount_needed_in_future
//         }
//       </Timeline.Item>
//     </Timeline>
//   </Panel>

//   <Panel
//     header={`${currentFormTitle}  Financing`}
//     extra={genExtra('QuestionFinancialAssitanceSubForm')}
//   >
//     {goalsObject['AssistanceReceivedSubForm']
//       .assitance_recived_details &&
//     goalsObject['AssistanceReceivedSubForm']
//       .assitance_recived_details.length > 0 ? (
//       <React.Fragment>
//         {goalsObject[
//           'AssistanceReceivedSubForm'
//         ].assitance_recived_details.map((item, index) => {
//           return (
//             <Collapse defaultActiveKey='1' key={index}>
//               <Panel
//                 header={index + 1}
//                 // extra={this.genExtra(subForm.id)}
//               >
//                 <Timeline>
//                   <Timeline.Item>
//                     {'Recipient'} : {item.recipient_name}
//                   </Timeline.Item>
//                   <Timeline.Item>
//                     {'Person Providing Assistance'} :{' '}
//                     {item.person_providing_assistances}
//                   </Timeline.Item>
//                   <Timeline.Item>
//                     {'Relationship'} : {item.relationship}
//                   </Timeline.Item>
//                   <Timeline.Item>
//                     {'Amount Received'} : {item.amount_reveived}
//                   </Timeline.Item>
//                 </Timeline>
//               </Panel>
//             </Collapse>
//           );
//         })}
//       </React.Fragment>
//     ) : (
//       ''
//     )}
//   </Panel>

//   <Panel
//     header={'Assign Assets'}
//     extra={genExtra('QuestionAssignAssetSubForm')}
//   >
//     {goalsObject['AssetsToGoalSubForm'].asset_to_assign_to_goal &&
//     goalsObject['AssetsToGoalSubForm'].asset_to_assign_to_goal
//       .length > 0 ? (
//       <React.Fragment>
//         {goalsObject[
//           'AssetsToGoalSubForm'
//         ].asset_to_assign_to_goal.map((item, index) => {
//           return (
//             <Collapse defaultActiveKey='1' key={index}>
//               <Panel
//                 header={index + 1}
//                 // extra={this.genExtra(subForm.id)}
//               >
//                 <Timeline>
//                   <Timeline.Item>
//                     {'Priority'} : {item.priority}
//                   </Timeline.Item>
//                   <Timeline.Item>
//                     {'Assets'} : {item.assets}
//                   </Timeline.Item>
//                   <Timeline.Item>
//                     {'Value of Asset at Goal Date'} :{' '}
//                     {item.value_of_asset_at_goal_date}
//                   </Timeline.Item>
//                   <Timeline.Item>
//                     {'Loan Value at Goal Date'} :{' '}
//                     {item.loan_value_at_goal_date}
//                   </Timeline.Item>
//                   <Timeline.Item>
//                     {'Amount to Use for this Goal'} :{' '}
//                     {item.amount_to_use_for_this_goal}
//                   </Timeline.Item>
//                   <Timeline.Item>
//                     {'Amount Used in Other Goals'} :{' '}
//                     {item.amount_used_in_other_goals}
//                   </Timeline.Item>
//                   <Timeline.Item>
//                     {'Taxes'} : {item.taxes}
//                   </Timeline.Item>
//                   <Timeline.Item>
//                     {'Net After Tax Applied to Goal'} :{' '}
//                     {item.net_after_tax_applied_to_goal}
//                   </Timeline.Item>
//                 </Timeline>
//               </Panel>
//             </Collapse>
//           );
//         })}
//       </React.Fragment>
//     ) : (
//       ''
//     )}
//   </Panel>

//   <Panel
//     header={'Savings'}
//     extra={genExtra('QuestionApplySavingSubForm')}
//   >
//     {goalsObject['AssignSavingsToGoalSubForm']
//       .assign_saving_to_goal &&
//     goalsObject['AssignSavingsToGoalSubForm'].assign_saving_to_goal
//       .length > 0 ? (
//       <React.Fragment>
//         {goalsObject[
//           'AssignSavingsToGoalSubForm'
//         ].assign_saving_to_goal.map((item, index) => {
//           return (
//             <Collapse defaultActiveKey='1' key={index}>
//               <Panel
//                 header={index + 1}
//                 // extra={this.genExtra(subForm.id)}
//               >
//                 <Timeline>
//                   <Timeline.Item>
//                     {'Asset To Assign Goal'} :{' '}
//                     {item.asset_to_assign_goal}
//                   </Timeline.Item>
//                   <Timeline.Item>
//                     {'Monthly Saving to Assign'} :{' '}
//                     {item.monthly_saving_to_assign}
//                   </Timeline.Item>
//                   <Timeline.Item>
//                     {'Date to Start Contribution'} :{' '}
//                     {item.date_to_start_contribution}
//                   </Timeline.Item>
//                   <Timeline.Item>
//                     {'Date to End Contribution'} :{' '}
//                     {item.date_to_end_contribution}
//                   </Timeline.Item>
//                   <Timeline.Item>
//                     {'Future Value of Asset with Saving'} :{' '}
//                     {item.future_value_of_asset_with_savings}
//                   </Timeline.Item>
//                 </Timeline>
//               </Panel>
//             </Collapse>
//           );
//         })}
//       </React.Fragment>
//     ) : (
//       ''
//     )}

//     <Timeline>
//       <Timeline.Item>
//         {'Current Monthly Saving Capacity'} :{' '}
//         {
//           goalsObject['AssignSavingsToGoalSubForm']
//             .current_monthly_saving_capacity
//         }
//       </Timeline.Item>
//       <Timeline.Item>
//         {'Total Monthly Saving'} :{' '}
//         {
//           goalsObject['AssignSavingsToGoalSubForm']
//             .total_monthly_saving
//         }
//       </Timeline.Item>
//       <Timeline.Item>
//         {'Monthly Needed to Fund Goal'} :{' '}
//         {
//           goalsObject['AssignSavingsToGoalSubForm']
//             .monthly_needed_to_fund_goal
//         }
//       </Timeline.Item>
//       <Timeline.Item>
//         {'Total Saving Including Rate of Return'} :{' '}
//         {
//           goalsObject['AssignSavingsToGoalSubForm']
//             .monthlySavingstoAssign
//         }
//       </Timeline.Item>
//     </Timeline>
//   </Panel>

//   <Panel header={'Loan'} extra={genExtra('QuestionLoanSubForm')}>
//     <Timeline>
//       <Timeline.Item>
//         {'Total Loan Assigned to Goal'} :{' '}
//         {
//           goalsObject['LoanGoalForm']
//             .current_monthly_saving_capacity
//         }
//       </Timeline.Item>
//     </Timeline>
//   </Panel>
// </React.Fragment>
