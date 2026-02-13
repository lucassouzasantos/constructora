import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Building, MapPin, Calendar, Trash2, Edit } from 'lucide-react';
import CurrencyInput from '../components/CurrencyInput';

interface Project {
    id: number;
    name: string;
    city?: string;
    location: string;
    startDate: string;
    endDate: string;
    customer?: { id: number, name: string };
    customerId?: number;
    totalArea?: number;
    salesValue?: number;
}

interface Customer {
    id: number;
    name: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        location: '',
        startDate: '',
        endDate: '',
        customerId: '',
        totalArea: '',
        salesValue: ''
    });

    useEffect(() => {
        fetchProjects();
        fetchCustomers();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('http://localhost:3000/projects');
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await fetch('http://localhost:3000/customers');
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleOpenModal = (project?: Project) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                name: project.name,
                city: project.city || '',
                location: project.location || '',
                startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
                endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
                customerId: project.customer?.id?.toString() || project.customerId?.toString() || '',
                totalArea: project.totalArea?.toString() || '',
                salesValue: project.salesValue?.toString() || ''
            });
        } else {
            setEditingProject(null);
            setFormData({
                name: '',
                city: '',
                location: '',
                startDate: '',
                endDate: '',
                customerId: '',
                totalArea: '',
                salesValue: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingProject
                ? `http://localhost:3000/projects/${editingProject.id}`
                : 'http://localhost:3000/projects';

            const method = editingProject ? 'PATCH' : 'POST';
            const payload = {
                ...formData,
                customerId: formData.customerId ? Number(formData.customerId) : null,
                totalArea: formData.totalArea ? Number(formData.totalArea) : null,
                salesValue: formData.salesValue ? Number(formData.salesValue) : null,
                startDate: formData.startDate || null,
                endDate: formData.endDate || null,
            };

            console.log('Sending payload:', payload);

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            console.log('Project saved:', response);
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server error:', errorData);
                alert(`Erro ao salvar obra: ${JSON.stringify(errorData)}`);
                return;
            }
            setIsModalOpen(false);
            setEditingProject(null);
            fetchProjects();
        } catch (error) {
            console.error('Error saving project:', error);
            alert(`Erro ao salvar obra: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir esta obra?')) return;
        try {
            await fetch(`http://localhost:3000/projects/${id}`, { method: 'DELETE' });
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">Obras e Projetos</h2>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm shadow-orange-500/20"
                >
                    <Plus className="w-5 h-5" />
                    Nova Obra
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar obra..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-xl border border-slate-200 hover:shadow-md transition-all p-5 space-y-4 group">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <Building className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <Link to={`/projects/${project.id}`}>
                                        <h3 className="font-semibold text-slate-800 hover:text-orange-500 transition-colors">{project.name}</h3>
                                    </Link>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleOpenModal(project)}
                                        className="text-slate-400 hover:text-blue-500 p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Editar Obra"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="text-slate-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Excluir Obra"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-slate-600">
                                {project.location && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-slate-400" />
                                        <span>{project.city || 'Sem cidade'}</span>
                                        {project.location && (
                                            <a href={project.location} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline text-xs ml-1">
                                                (Ver Mapa)
                                            </a>
                                        )}
                                    </div>
                                )}
                                {project.customer && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        <span className="font-medium text-slate-700">{project.customer.name}</span>
                                    </div>
                                )}
                                {(project.startDate || project.endDate) && (
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-2 bg-slate-50 p-2 rounded-lg">
                                        <Calendar className="w-3 h-3" />
                                        <span>
                                            {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}
                                            {' - '}
                                            {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {projects.length === 0 && !loading && (
                        <div className="col-span-full py-12 text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Building className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900">Nenhuma obra cadastrada</h3>
                            <p className="text-slate-500">Comece criando um novo projeto para gerenciar.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-semibold text-lg text-slate-800">{editingProject ? 'Editar Obra' : 'Nova Obra'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Obra *</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Cidade</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                                        value={formData.city}
                                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                                        placeholder="Ex: Assunção"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Localização (Link Maps)</label>
                                    <input
                                        type="url"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                                        value={formData.location}
                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="https://maps.google.com/..."
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Cliente</label>
                                <select
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                                    value={formData.customerId}
                                    onChange={e => setFormData({ ...formData, customerId: e.target.value })}
                                >
                                    <option value="">Selecione um cliente (opcional)</option>
                                    {customers.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Área Total (m²)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                                        value={formData.totalArea}
                                        onChange={e => setFormData({ ...formData, totalArea: e.target.value })}
                                        placeholder="0.00"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Valor do Contrato</label>
                                    <CurrencyInput
                                        value={formData.salesValue}
                                        onValueChange={(value) => setFormData({ ...formData, salesValue: value })}
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Início Planejado</label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                                        value={formData.startDate}
                                        onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Término Planejado</label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                                        value={formData.endDate}
                                        onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors shadow-sm shadow-orange-500/20"
                                >
                                    {editingProject ? 'Salvar Alterações' : 'Salvar Obra'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
