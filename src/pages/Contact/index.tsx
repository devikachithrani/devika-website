import React from "react";
import { useForm, FormProvider } from "react-hook-form";
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomInput from "components/CustomInput";
import Button from "components/Button";
import Layout from "components/Layout";

import useStyles from "theme/jss/material-kit-react/pages/workWithUs";

type FormData = {
  email: string;
  message: string;
  name: string;
};

export default function WorkSection() {
  // Allows use to have validation etc on the form
  const methods = useForm<FormData>();
  const { handleSubmit } = methods;

  // Our submit function
  const onSubmit = (data: FormData) => {
    const { name, message } = data;
    window.open(
      `mailto:devikac@uvic.ca?subject=${name}%20-%20Comment&body=${encodeURI(
        message
      )}`
    );
  };

  const classes = useStyles();
  return (
    <Layout>
      <div className={classes.section}>
        <GridContainer justify={"center"}>
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Work with us</h2>
            <h4 className={classes.description}>
              Include your name, email, and message and we will get back to you!
              Contact us for any reason, including research opportunities or
              collaborations.
            </h4>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={8} md={6} lg={4}>
            <div className={classes.form}>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <GridContainer item>
                    <GridItem>
                      <CustomInput
                        defaultValue=""
                        labelText="Your Name"
                        id="name"
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <CustomInput
                      labelText="Your Message"
                      id="message"
                      defaultValue=""
                      formControlProps={{
                        fullWidth: true,
                        className: classes.textArea,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                      }}
                    />
                    <GridItem xs={12} sm={12} md={4} lg={4}>
                      <Button color="primary" type={"submit"}>
                        Send Message
                      </Button>
                    </GridItem>
                  </GridContainer>
                </form>
              </FormProvider>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </Layout>
  );
}
