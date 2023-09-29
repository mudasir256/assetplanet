import React from 'react';
import PropTypes from 'prop-types';

/* *** Antd Components *** */
import { Table } from 'antd';

/* *** Custom Components *** */
import PageTitle from '../../../components/layout/PageTitle';
import SubTitle from '../../../components/layout/SubTitle';

/* *** Styles *** */
import './TableReport.css';

const TableReport = ({ title, subTitle, rows, cols, ...props }) => {   
    return (
        <div className="table-report">
            {title !== '' && (
                <PageTitle title={title} level={4} />
            )}
            {subTitle !== '' && (
                <SubTitle subTitle={subTitle} />
            )}
            <Table bordered dataSource={rows} columns={cols} pagination={false} size="large" {...props} />
        </div>
    );
}

TableReport.defaultProps = {
    title: '',
    subTitle: '',
}

TableReport.propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    rows: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
    cols: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};

export default TableReport;
