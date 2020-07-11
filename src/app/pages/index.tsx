import React from 'react';
import { makeStyles, Theme, StyleRules } from '@material-ui/core/styles';

import useTranslation from '@helpers/hooks/useTranslation';
import withHead from '@helpers/hocs/withHead';

const useStyles = makeStyles(
  (theme: Theme): StyleRules => ({
    container: {
      backgroundColor: 'yellow',
    },
  })
);

/**
 * Homepage
 * @param props - The props of the page
 */
const Home = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.container}>
      <p>{t('common:home.meta.title')}</p>
    </div>
  );
};

export default withHead(Home, ['all']);
