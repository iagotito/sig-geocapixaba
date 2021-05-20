<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <NamedLayer>
    <Name>sedes_municipais_styles</Name>
    <UserStyle>
      <Title>red square point style</Title>
      <FeatureTypeStyle>
        <Rule>
          <Title>sedes municipais</Title>
          <PointSymbolizer>
            <Graphic>
              <Mark>
                <WellKnownName>Circle</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#C900FF</CssParameter>
                </Fill>
              </Mark>
              <Size>9</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule>

      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>