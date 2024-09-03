import Loading from "../Loading";
import Input from "../Input/Index";
import Button from "../Button/Index";
import { errorLog, infoLog } from "../../Utils/Logger";
// import { ThemeContext } from "../../Contexts/ThemeContext";
import { UserContext } from "../../Contexts/UserContext";
import { useCallback, useContext, useEffect, useState } from "react";
import { GetSelectAllEmpreendimento } from "../../Services/ReportService";
import InputDropDown from "../Input/InputDropDown";

const EmpreendimentoLeads = () => {
  const [loading, setLoading] = useState(true);
  const { activeUser } = useContext(UserContext);
  const [empreendimentos, setEmpreendimentos] = useState<any[]>([]);
  // const { colorMode } = useContext(ThemeContext) || {};
  // const [alert, setAlert] = useState<null | { type: 'error' | 'success' | 'warning', title: string, message: string }>(null);

  const getReportData = useCallback(async () => {
    try {
      const userId = Number(activeUser?.id) || 0; 
      const response = await GetSelectAllEmpreendimento(userId);

      const getSelectEmpreendimento = response.map(({ id, nome }: { id: number, nome: string }) => ({
        label: nome,
        value: id.toString(),
      }));

      setEmpreendimentos(getSelectEmpreendimento);

      setLoading(false);
    } catch (error) {
      errorLog(error);
      setLoading(false);
    }
  }, []);

  const handleSubmit = () => {
    infoLog('handleSubmit');
  }


  useEffect(() => {
    getReportData();
  }, [getReportData]);

  return (
    <section
      className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      style={{ height: 'calc(89vh - 3px)' }}>
      {loading && <Loading fullscreen text="Carregando Clientes com Propostas..." />}
      {!loading && (
        <>
          <div className="border-b border-stroke dark:bg-boxdark bg-bodyWhite dark:border-strokedark">
            <div className="row" style={{ marginTop: 0 }}>
              <div className="col-md-9 mb-2 mt-3">
                <div className="ml-4 mb-3">
                  <label style={{ fontFamily: 'nunito', fontSize: 14, fontWeight: '700' }}>RELATÓRIO DE LEADS POR EMPREENDIMENTO</label>
                </div>
              </div>
            </div>
          </div>
          <div className="mi-card">
            <div className="row border-b border-stroke dark:bg-boxdark bg-bodyWhite dark:border-strokedark">
              <div className="col-md-4"></div>

              <div className="col-md-8 mb-4">
                    <InputDropDown
                        label="Empreendimento"
                        name="empreendimentoId"
                        value={''} 
                        options={empreendimentos}
                        onChange={(e) => console.log(e)}
                        multiple={false}
                        placeholder="Selecione um empreendimento"
                        required
                        autoFocus
                    />
                </div>


              <div className="col-md-1 mt-1">
                <Input
                  type="date"
                  name="data"
                  style={{ fontFamily: 'nunito', fontSize: 14, fontWeight: '700' }}
                  required
                />
              </div>
              <div className="col-md-1 mt-1">
                <Input
                  height={3}
                  type="date"
                  name="data"
                  style={{ fontFamily: 'nunito', fontSize: 14, fontWeight: '700' }}
                  required
                />
              </div>
              <div className="col-md-1 mt-1.5 mb-1.5">

                <Button
                  height={36}
                  width={130}
                  type="submit"
                  text='Filtrar'
                  color='#28C76F'
                  disabled={false}
                  fontWeight={'600'}
                  fontFamily='nunito'
                  marginTop="-1px"
                  borderRadious="2px"
                  onClick={handleSubmit}
                />
              </div>


            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default EmpreendimentoLeads