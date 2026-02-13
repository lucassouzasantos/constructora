
import { FileText, Clock, AlertTriangle } from 'lucide-react';

export default function ContractsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">Contratos</h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-10 h-10 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Módulo em Desenvolvimento</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                    A gestão de contratos estará disponível em breve. Aqui você poderá gerenciar contratos de obras, prestadores de serviço e clientes.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span>Previsão: Q4 2026</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
